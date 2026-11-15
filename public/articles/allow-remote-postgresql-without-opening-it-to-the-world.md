---
title: "How to Allow Remote PostgreSQL Connections Securely"
description: "Secure remote PostgreSQL access with three locks: listen_addresses, pg_hba.conf rules, and a firewall. No open exposure to the internet."
date: "2026-10-27"
category: "Security"
canonical: "https://nirjar.me/articles/allow-remote-postgresql-without-opening-it-to-the-world"
readTime: "6 min"
---

# How to Allow Remote PostgreSQL Connections Securely

> Secure remote PostgreSQL access with three locks: listen_addresses, pg_hba.conf rules, and a firewall. No open exposure to the internet.

- **Published**: October 27, 2026
- **Category**: Security
- **Read Time**: 6 min
- **Canonical**: https://nirjar.me/articles/allow-remote-postgresql-without-opening-it-to-the-world

## Why the quick fix is wrong

By default, PostgreSQL on Debian and Ubuntu only listens on `localhost`. When your app server or laptop needs to connect from another machine, every quick-fix answer says the same thing: set `listen_addresses = '*'`, add `0.0.0.0/0` to `pg_hba.conf`, and restart. It works, and it puts your database on the public internet, where bots find port 5432 within hours.

There are three ways to allow remote access. Options 1 and 2 are not ideal.

1. **`listen_addresses = '*'` plus `host all all 0.0.0.0/0 scram-sha-256` in `pg_hba.conf`.** Anyone on the internet can now attempt to log in as any user on any database. Your only protection is a password, and the `postgres` superuser is a known target. The connection is also not guaranteed to be encrypted.

2. **Open the port in the firewall and rely on the firewall alone.** This is better, but it leaves PostgreSQL listening on every interface, so a single firewall mistake (or a Docker-published port bypassing UFW) exposes it. It also gives you no per-user, per-database control.

## Proper way

Think of it as three independent locks: **where PostgreSQL listens**, **who is allowed to connect** (`pg_hba.conf`), and **what the firewall lets through**. Set each one as narrowly as you can, so a mistake in one doesn't expose the database. Then *test* that the other connections are refused instead of assuming it.

In the examples below, `203.0.113.10` is a documentation-only example address for your client, `10.0.0.5` is the server's private address, and `db.example.com` is the server's DNS name. Replace all three with your own. Paths are for Debian/Ubuntu with PostgreSQL 16 (`/etc/postgresql/16/main/`). Adjust the version and cluster name to match yours.

1. **Make PostgreSQL listen only on the address it needs.** First, check that the address really exists on the server:

```bash
ip -br addr
```

   On many cloud VMs the public IP is NAT'd and is *not* assigned to any interface, so bind to the private or VPN address instead. Then edit `postgresql.conf`:

```conf
# Not '*'. Localhost plus the one private (or VPN) address:
listen_addresses = 'localhost, 10.0.0.5'
```

   Changing `listen_addresses` requires a **restart**, not just a reload. If the address isn't assigned to an interface when PostgreSQL starts, it fails to bind and the service won't come up, so check the PostgreSQL log if that happens.

2. **Create a dedicated role and database instead of using `postgres` remotely.** Remote connections should never use the superuser. Set the password from inside `psql` with `\password`, which keeps it out of your shell history and the server logs:

```sql
SHOW password_encryption;
CREATE ROLE appuser WITH LOGIN;
\password appuser
CREATE DATABASE appdb OWNER appuser;
```

   Modern PostgreSQL versions default to `scram-sha-256` for newly set passwords, but existing passwords keep whatever hash they were stored with until they are reset. This matters because a `scram-sha-256` rule in `pg_hba.conf` only works for passwords stored as SCRAM. If `SHOW password_encryption;` doesn't say `scram-sha-256`, run `SET password_encryption = 'scram-sha-256';` before setting the password. Afterwards, check the stored hash as a superuser:

```sql
SELECT rolname, left(rolpassword, 14) AS hash_prefix
FROM pg_authid WHERE rolname = 'appuser';
-- expect: SCRAM-SHA-256$
```

3. **Allow exactly one user, one database and one address in `pg_hba.conf`.** Add this line:

```conf
# TYPE    DATABASE  USER      ADDRESS           METHOD
hostssl   appdb     appuser   203.0.113.10/32   scram-sha-256
```

   Here is what each part does:

   - `hostssl` accepts only encrypted connections. A plain `host` line would also allow unencrypted ones.
   - `/32` means a single IPv4 address. Use something like `/24` only if you really mean a whole subnet. IPv6 clients need their own line.
   - `scram-sha-256` is the password method. Never use `trust` for anything that isn't a local socket.
   - Rules are read top to bottom and the **first match wins**. If a connection matches a rule and authentication fails, PostgreSQL does *not* try the next rule. So a broad rule above your narrow one will override it, and your new line is only as safe as everything above it.

4. **Set up TLS properly.** `ssl = on` gives you encryption, but encryption alone doesn't prove you are talking to *your* server. First, see what the cluster is currently using:

```sql
SHOW ssl;
SHOW ssl_cert_file;
```

   Depending on how it was installed, a cluster may be using a self-signed "snakeoil" certificate, which clients cannot verify. For anything real, use a certificate whose name matches how clients connect: the DNS name (`db.example.com`) as a subject alternative name, or an IP address SAN if clients connect by IP. Then point PostgreSQL at it in `postgresql.conf`:

```conf
ssl = on
ssl_cert_file = '/etc/postgresql/ssl/server.crt'
ssl_key_file  = '/etc/postgresql/ssl/server.key'
```

   The private key must not be readable by group or others. If the key is owned by the `postgres` user, `chmod 600` is the right permission.

5. **Apply the changes and check them.** `listen_addresses` and the TLS settings need a restart, and `pg_hba.conf` alone needs only a reload:

```bash
sudo systemctl restart postgresql
```

   Then check that PostgreSQL parsed your rules without errors, and read the **whole** list from top to bottom:

```sql
SELECT line_number, type, database, user_name, address, auth_method, error
FROM pg_hba_file_rules;
```

   If the `error` column has anything in it, fix that line first. Then look for older lines that are broader than yours: a `host all all 0.0.0.0/0 ...` rule, any `trust` method, or a wide subnet. Those matter more than the line you just added.

6. **Add the firewall rule last, scoped to the same address:**

```bash
sudo ufw allow from 203.0.113.10 to any port 5432 proto tcp
```

   Now you have three layers. If PostgreSQL runs in Docker, though, these host-level settings are not enough on their own. What is exposed depends on how the port is published (`-p 127.0.0.1:5432:5432` versus `-p 5432:5432`), on the container's own `listen_addresses` and `pg_hba.conf` (the official image is typically configured to accept connections from any address inside the container network), on which Docker firewall backend you use, and on any cloud firewall in front. Docker-published ports also bypass UFW, so use the `DOCKER-USER` approach from the previous post instead of relying on this rule.

7. **Test from the client with certificate verification:**

```bash
psql "host=db.example.com dbname=appdb user=appuser sslmode=verify-full sslrootcert=/path/to/ca.crt"
```

   `verify-full` checks that the certificate was issued by a CA the client trusts *and* that its name matches the host you connected to, which protects against someone impersonating the server. The name you connect with must resolve to the intended server and match the certificate. By comparison, `sslmode=require` encrypts the connection but does not reliably verify who is on the other end, so use it only for a quick first test.

   Then confirm the session really is encrypted:

```sql
SELECT ssl, version, cipher FROM pg_stat_ssl WHERE pid = pg_backend_pid();
```

8. **Confirm other connections are refused. Don't just assume it.** From a machine that is not on your allow list:

```bash
nmap -Pn -p 5432 your.server.ip
```

   The port should show as filtered or closed. From the *allowed* address, also try a different role or database. You should get an error like `no pg_hba.conf entry for host ...` instead of a login prompt. On the server, `ss -tlnp | grep 5432` should list only the addresses you chose, not `0.0.0.0` or `[::]`.

You now have a narrowly scoped configuration. PostgreSQL listens on the interfaces you chose, the intended client is authorized for one database and one role, TLS is required and verified, and the firewall restricts access to the permitted source address. Before you conclude that everything else is blocked, make sure you have read the full `pg_hba.conf` rule list and checked every firewall layer in front of the server, including any cloud security group.

Unrelated but make sure you never test remote access by temporarily setting `host all all 0.0.0.0/0 trust` "just to see if it works." Temporary rules like that are the ones that get forgotten and end up in production.

## Reference

- [PostgreSQL docs: The pg_hba.conf file](https://www.postgresql.org/docs/current/auth-pg-hba-conf.html)
- [PostgreSQL docs: Connections and authentication](https://www.postgresql.org/docs/current/runtime-config-connection.html)
- [PostgreSQL docs: Password authentication](https://www.postgresql.org/docs/current/auth-password.html)
- [PostgreSQL docs: Secure TCP/IP connections with SSL](https://www.postgresql.org/docs/current/ssl-tcp.html)

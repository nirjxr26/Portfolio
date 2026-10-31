export type BlogSection = { subtitle: string; content: string }
export type BlogArticle = {
  slug: string
  title: string
  description: string
  updated: string
  readTime: string
  category: string
  sections: BlogSection[]
  cardDate: string
  cardDesc: string
  cardReadTime: string
  hideFromHome?: boolean
  keywords: string
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "programming-is-taught-wrong-and-ai-made-it-obvious",
    title: "Programming is taught wrong, and AI made it obvious",
    description:
      "Programming education still stops at loops and prime checkers. What AI changes about that, and what a syllabus worth teaching would look like.",
    updated: "October 31, 2026",
    readTime: "9 min",
    category: "Artificial Intelligence",
    cardDate: "Oct 31, 2026",
    cardDesc: "The exam tested loops. The job tests judgement — and AI made the difference impossible to ignore.",
    cardReadTime: "9 min read",
    keywords:
      "programming education, software engineering, computer science curriculum, AI coding agents, code review, secure coding, SQL injection, XSS, DevOps, India, employability, Stack Overflow Developer Survey 2026, METR, Veracode",
    sections: [
      {
        subtitle: "",
        content: `I recently sat a Python and shell scripting exam, and somewhere in the middle I realized I could pass it half asleep, and that passing would prove almost nothing.

The questions were the usual ones. Reverse a string. Check if a number is prime. Print a pattern of stars. As far as I can tell, the same programs were in the exam a decade ago.

These exercises aren't useless. A beginner has to understand loops and conditionals before anything else makes sense, and I'd teach them first too. The trouble is that they've become the finish line. Students memorize the answers, collect the marks, and believe they've learned to code. I believed that too, until I tried to build a real project and opened a production codebase, and found that most of what I had memorized didn't help.`,
      },
      {
        subtitle: "Why college leaves you stuck",
        content: `The gap is between two different jobs.

| Programming | Software engineering |
| --- | --- |
| Writing code | Designing systems |
| Implementing functions | Structuring applications |
| Solving one problem | Managing complexity across a whole system |
| Producing the right output | Keeping it correct and reliable |
| Running a program | Testing and maintaining it |
| Writing an implementation | Securing and operating it |

A student can finish a degree living entirely in the left column. As far as I can tell, most of the job happens in the right one, and it adds things the left column never mentions: trade-offs between a fast solution and one the next person can maintain, logs and metrics so you can tell what broke at 2am, reliability as traffic grows, and a team all editing the same files.

Nobody ships a prime number checker. Real code is a service with endpoints, a database, and config that changes per environment. Try building one using only what's taught in class and you hit a wall almost immediately, because isolated snippets don't show you how to structure a project, connect a database, or handle a request.

Here is the same gap in exam form.

> Today's question: Write a program to check whether a number is prime.
>
> A real-job question: Here is a 60-line API endpoint that takes a username and returns that user's records. It works. Find what's wrong with it, explain how someone could abuse it, and fix it.

The first tests whether you memorized a loop. The second tests whether you can think.

This isn't a new complaint. Earlier studies of programming students also found that reading and understanding code was a weak spot, long before anyone asked an agent to write it for us.`,
      },
      {
        subtitle: "When an agent writes the code",
        content: `A lot of code is now written with AI. In Stack Overflow's 2026 developer survey, 65.9% of respondents used coding assistants or agents, and only 17.2% said they used no AI tools. You can sit with an agent, plan a project from top to bottom, and have a working prototype far faster than you could type it. [Stack Overflow Developer Survey 2026 — AI usage data](https://survey.stackoverflow.co/2026/ai/data).

I want to be careful about what that means. AI cuts the effort of typing out an implementation. It doesn't remove architectural decisions, verification, security review, integration, or the responsibility of running the thing in production. For a small project like a college assignment, I'd guess the speedup is large (I haven't measured it). For big mature codebases the picture is murkier: in a randomized trial, METR found that experienced open-source developers took 19% longer with AI tools on their own repositories. That study used early-2025 tools, so it's a data point, not a verdict.

Research on AI-assisted development points in different directions. Three field experiments involving 4,867 developers found that coding assistants were associated with 26% more completed tasks, particularly among less experienced developers ([Cui et al., 2026](https://doi.org/10.1287/mnsc.2025.00535)). But METR found that experienced open-source developers took 19% longer when using early-2025 AI tools on their own repositories ([METR, 2025](https://arxiv.org/abs/2507.09089)). The takeaway isn't that AI always makes developers faster or slower; the result depends on the task, tools, and codebase.

What I keep coming back to is that the ability to generate software and the ability to understand it are becoming separate skills. A student who doesn't know advanced coding concepts can now build a working tool, and still be unable to find the smallest bug in it, or read it well enough to explain it. That has nothing to do with being less smart or not being a topper. They were never exposed to the patterns real code is built on. It's like being handed a calculator without knowing arithmetic: when the answer comes out wrong by a factor of ten, you have no way to notice.

Programming-education research points to the same distinction. One study found that students had more difficulty correcting AI-generated code than completing traditional programming tasks ([Kohen-Vacs et al., 2025](https://doi.org/10.1007/s40593-025-00496-4)). Another, involving 275 students, found that AI support improved exercise performance but did not produce better code comprehension or knowledge gains ([Bassner et al., 2026](https://doi.org/10.1016/j.caeai.2025.100537)). In other words, completing a task is not the same as understanding the code.

Working developers seem to know this already. In the same 2026 survey, nearly half said they trust AI output when they can verify it, and only 6.6% would trust it with an important decision. Verifying is the job now, and verifying needs exactly the knowledge the syllabus skips.

The same survey found that developers commonly check AI output against their local environment, existing code, tests, and security requirements; only 9.6% said they use it as-is. These are self-reported habits, but they reinforce the point: verification is now part of the job. [Stack Overflow Developer Survey 2026](https://survey.stackoverflow.co/2026/ai/data/ai-work-next).

It wasn't always like this. People used to pick up production-level coding on the job, because there was no agent to build a project in hours. They spent a long time researching how to structure a project and wire its parts together. A bachelor's project was usually a management system with a website and a handful of features, and the real engineering knowledge came later, at work. Now, with free quotas and holiday credits, people build "vibe" projects without knowing what an API is. The tools are there and the understanding isn't.

My point is this. If implementation got cheaper, the teaching time spent on it should shrink too. A prototype that once took a team of six or seven and months of work can now be scaffolded by one student in far less time (a rough guess, but I doubt it's off by an order of magnitude). We can spend the freed time on structure, trade-offs, and review.`,
      },
      {
        subtitle: "What the India numbers show, and what they don't",
        content: `The numbers point to a wider skills and employment challenge. The India Skills Report 2026 estimates employability at about 80% for computer science and IT candidates, while the overall BE/BTech figure fell from 71.5% to 70.15%. These scores reflect performance against the report's employability test, not actual placement rates ([India Skills Report 2026](https://wheebox.com/assets/pdf/ISR_Report_2026.pdf)). Azim Premji University's *State of Working India 2026* also highlights the widening gap between graduate numbers and graduate employment ([report](https://azimpremjiuniversity.edu.in/publications/2026/report/swi-2026)).

These figures don't prove that outdated programming syllabi cause unemployment. Placement also depends on the job market, college, communication skills, and labour demand. They do, however, provide context for the skills gap that industry has repeatedly raised. Connecting that gap to how programming is taught is my interpretation, based on the exams and projects I've seen around me.

I also haven't tested how many students can review AI-generated code, and I don't know of a study that has. I suspect it's fewer than should, but that's a suspicion, and somebody should run the experiment.`,
      },
      {
        subtitle: "Tools nobody hands you",
        content: `DevOps gets listed with tools, but it's really a set of practices: short feedback loops, automation, and shared ownership of what runs in production. Git, CI/CD pipelines, containers, and deployment systems are the tools that make those practices possible. Working engineers also live in pull requests and code reviews, a Linux command line, API testing, dependency management, observability, and documentation.

Most students finish a degree without touching any of this. We learn how to write code and almost never how it's organized, maintained, tested, and delivered. We don't see how a change travels from a laptop to a running system: built, checked, packaged, and deployed so real users can reach it.

None of it needs a semester each. Most needs a few weeks and a project. And everything else leans on it. Without version control, a team can't work on the same code. Without tests, nobody knows whether a change broke something. Without a pipeline, nothing reliably reaches users. These should be core subjects from the first year, graded like everything else.`,
      },
      {
        subtitle: "Pick a track",
        content: `Teaching should give students the exposure they'd otherwise get only after joining a company, not just a CGPA. Those numbers matter far less than what a student can do.

From the bachelor's level, students should be able to pick a niche: mobile app development, DevOps, cybersecurity, software engineering, QA testing, cloud architecture or cloud security, and more. They'd learn the work before the pressure of a real job arrives, instead of a little of everything and depth in nothing.

I don't have a full curriculum design, but I can see where the hard parts are.

On timing, I'd specialize after a shared first year, since nobody can choose a track they've never seen. On what stays compulsory, I'd keep programming, data structures, databases, networks, operating systems, and the engineering tools above as a shared base. On switching, if the base is the same, changing tracks should cost a few track-specific credits and not a lost year. The real constraint is faculty and labs. A college can't staff seven tracks well. Offering two or three properly, and sharing the rest through industry-taught or online modules that count for credit, seems more realistic than offering all of them badly.`,
      },
      {
        subtitle: "What should we write instead?",
        content: `Once students have a track and the tools, the next question is what they should write. The basics stay, as a way into the code real software is built with. I'd group the rest into five areas:

1. **Application development:** APIs with routes, input checks, login tokens, and error responses; async code; typed code with TypeScript or Python type hints.
2. **Software architecture:** project structure with layers and modules and config kept separate; design patterns like factory, strategy, and dependency injection; OOP and functional style, including interfaces, composition, closures, and decorators.
3. **Data and infrastructure:** databases, queries, an ORM, transactions, and caching.
4. **Testing and reliability:** unit and integration tests, mocking, custom errors, retries, timeouts, and searchable logs.
5. **Performance:** picking the right data structure, profiling, and fixing slow code.

> A note on depth: every area above goes much deeper than a bachelor's course can cover, and each is a field of its own. The goal is for students to implement them at a basic to intermediate level, at most. They should leave knowing what each one is, why it exists, and how to use it in a working project. Depth comes later, in the track they choose.`,
      },
      {
        subtitle: "A real exam question, taken apart",
        content: `Here's a typical programming paper, and it looks reasonable at first glance.

*[Insert the screenshot of the "Develop a Student Management System" paper here]*

The task is to build a Student Management System in Python using classes, lists, dictionaries, and nested data structures. Each student has an ID, name, age, department, and marks. The program has to add, display, search, update, and delete records, find the highest and lowest marks, and sort students by average.

As a first assignment, it's fine. A terminal-based record manager teaches classes, dictionaries, and basic logic, and I wouldn't throw it out. What bothers me is that nothing comes after it. The paper never asks for:

- **Persistent storage.** Close the program and every record is gone.
- **Input validation.** Nothing stops an age of -5, marks of 900, or two students with the same ID.
- **Authentication and authorization.** Anyone can delete any record.
- **Application structure.** One file and one class, so nobody has to think about how the code is split.
- **Error handling.** What happens when you delete a student who doesn't exist?
- **Tests.** The only proof it works is running it and looking.
- **An interface other systems can use.** It's a terminal menu, not an API.

The fix doesn't need a new topic. The same assignment could grow in steps: save the records to a database, validate the input, expose it as an API, add a login, and write tests for it. Five steps in the same domain, and each one teaches a skill the paper skips. The exam shouldn't be a different question each year. It should be the same project, one level further.`,
      },
      {
        subtitle: "Security belongs in the code",
        content: `If students are going to build APIs, databases, and login systems, they need to know how those get attacked. Right now security is mostly a separate subject for the cybersecurity track, taught as theory. But anyone writing a web app is writing something an attacker can poke at, and AI-generated code raises the stakes. Veracode's 2026 benchmark found that the models it tested passed an average of 56% of its security tasks ([GenAI Code Security Report 2026](https://view.ceros.com/veracode/genai-code-security-report2026)). A Stanford user study also found that participants using an AI assistant wrote less secure code and were more likely to believe it was secure.

Code that looks clean and runs fine is exactly the code nobody questions. So the basics of secure coding should go to every student, as code they write. Here is what I'd put in the syllabus.

SQL injection. Build a query from raw user input and an attacker can read or delete the whole database. The fix is parameterized queries.

Vulnerable, because the input is pasted straight into the query:

\`\`\`python
db.execute(f"SELECT * FROM users WHERE name = '{name}'")
\`\`\`

Safe, because the input travels separately from the query:

\`\`\`python
db.execute("SELECT * FROM users WHERE name = ?", (name,))
\`\`\`

Cross-site scripting (XSS). Unescaped user input in a page can run an attacker's script in someone else's browser. Input validation and output encoding are different defenses. Validation decides what you accept. Encoding decides how you display it, and what's safe depends on where the data lands (an HTML page, an attribute, a script, a URL). Checking a name field doesn't make it safe to drop into HTML. Teach both, and prefer frameworks that escape by default.

The rest of the list:

- **Passwords and authentication:** never store passwords in plain text. Hash them with something like bcrypt or argon2, set token expiry, and don't trust a token you haven't verified.
- **Secrets and configuration:** API keys, database passwords, and secret keys belong in environment variables or a secrets manager, never in the code or a public Git repo.
- **Authorization:** logging in isn't enough. The code has to check that this user may access this record, or anyone can read anyone else's data by changing an ID in the URL.
- **Input validation:** treat every input as untrusted and check its type, length, and range.
- **Safe error messages:** users should see "something went wrong," not a stack trace that shows an attacker how the system is built.
- **CSRF, rate limiting, and HTTPS:** know what each one protects against and how to switch it on.
- **Dependencies:** every package you install is code someone else wrote, so check for known vulnerabilities and keep them updated.

> A note on depth: this isn't a full cybersecurity course. Students should learn to recognize each of these issues and apply the standard fix at a basic to intermediate level. Penetration testing, cryptography, and threat modeling are what the cybersecurity track is for.

The exam can test this the same way as everything else: give them a short piece of code and ask what's wrong and how to fix it.`,
      },
      {
        subtitle: "Where this leaves us",
        content: `I'd want programming education to produce engineers who understand what they build, can evaluate it, and take responsibility for what they ship. Writing code unassisted was always a means to that, and it's a cheaper means now than it was.

If agents keep improving, I'd expect typing code to get cheaper every year and judging it to get more valuable. The 2026 survey already points that way: developers trust AI output when they can check it, and rarely otherwise. A student who can read a generated function and spot the injection in it will probably be fine whatever tool shows up next.

What I'd like to see is one Indian university run the experiment. Take a cohort, swap half the loop exercises for the build-and-review projects above, and compare them with a normal cohort after a year. I'd read that paper.`,
      },
      {
        subtitle: "Research and source links",
        content: `- [Stack Overflow Developer Survey 2026 — AI usage](https://survey.stackoverflow.co/2026/ai/data)
- [Stack Overflow Developer Survey 2026 — AI verification](https://survey.stackoverflow.co/2026/ai/data/ai-work-next)
- [Cui et al. (2026), *Management Science*](https://doi.org/10.1287/mnsc.2025.00535)
- [METR (2025) — AI tools and experienced open-source developers](https://arxiv.org/abs/2507.09089)
- [Kohen-Vacs et al. (2025) — students correcting AI-generated code](https://doi.org/10.1007/s40593-025-00496-4)
- [Bassner et al. (2026) — randomized study of AI-supported programming education](https://doi.org/10.1016/j.caeai.2025.100537)
- [India Skills Report 2026](https://wheebox.com/assets/pdf/ISR_Report_2026.pdf)
- [Azim Premji University — State of Working India 2026](https://azimpremjiuniversity.edu.in/publications/2026/report/swi-2026)
- [Veracode — GenAI Code Security Report 2026](https://view.ceros.com/veracode/genai-code-security-report2026)`,
      },
    ],
  },

  {
    slug: "allow-remote-postgresql-without-opening-it-to-the-world",
    title: "How to allow remote PostgreSQL connections without opening it to the world",
    description:
      "Allow remote access to PostgreSQL using listen_addresses, pg_hba.conf, verified TLS and a scoped firewall rule, instead of 0.0.0.0/0.",
    updated: "October 27, 2026",
    readTime: "6 min",
    category: "Security",
    cardDate: "Oct 27, 2026",
    cardDesc: "Three locks instead of one: where Postgres listens, who may connect, and what the firewall allows.",
    cardReadTime: "6 min read",
    keywords: "PostgreSQL, remote access, listen_addresses, pg_hba.conf, TLS, sslmode, verify-full, UFW, firewall, scram-sha-256, pg_authid, pg_hba_file_rules, Docker, security",
    sections: [
      {
        subtitle: "Why the quick fix is wrong",
        content:
          "By default, PostgreSQL on Debian and Ubuntu only listens on `localhost`. When your app server or laptop needs to connect from another machine, every quick-fix answer says the same thing: set `listen_addresses = '*'`, add `0.0.0.0/0` to `pg_hba.conf`, and restart. It works, and it puts your database on the public internet, where bots find port 5432 within hours.\n\nThere are three ways to allow remote access. Options 1 and 2 are not ideal.\n\n1. **`listen_addresses = '*'` plus `host all all 0.0.0.0/0 scram-sha-256` in `pg_hba.conf`.** Anyone on the internet can now attempt to log in as any user on any database. Your only protection is a password, and the `postgres` superuser is a known target. The connection is also not guaranteed to be encrypted.\n\n2. **Open the port in the firewall and rely on the firewall alone.** This is better, but it leaves PostgreSQL listening on every interface, so a single firewall mistake (or a Docker-published port bypassing UFW) exposes it. It also gives you no per-user, per-database control.",
      },
      {
        subtitle: "Proper way",
        content:
          "Think of it as three independent locks: **where PostgreSQL listens**, **who is allowed to connect** (`pg_hba.conf`), and **what the firewall lets through**. Set each one as narrowly as you can, so a mistake in one doesn't expose the database. Then *test* that the other connections are refused instead of assuming it.\n\nIn the examples below, `203.0.113.10` is a documentation-only example address for your client, `10.0.0.5` is the server's private address, and `db.example.com` is the server's DNS name. Replace all three with your own. Paths are for Debian/Ubuntu with PostgreSQL 16 (`/etc/postgresql/16/main/`). Adjust the version and cluster name to match yours.\n\n1. **Make PostgreSQL listen only on the address it needs.** First, check that the address really exists on the server:\n\n```bash\nip -br addr\n```\n\n   On many cloud VMs the public IP is NAT'd and is *not* assigned to any interface, so bind to the private or VPN address instead. Then edit `postgresql.conf`:\n\n```conf\n# Not '*'. Localhost plus the one private (or VPN) address:\nlisten_addresses = 'localhost, 10.0.0.5'\n```\n\n   Changing `listen_addresses` requires a **restart**, not just a reload. If the address isn't assigned to an interface when PostgreSQL starts, it fails to bind and the service won't come up, so check the PostgreSQL log if that happens.\n\n2. **Create a dedicated role and database instead of using `postgres` remotely.** Remote connections should never use the superuser. Set the password from inside `psql` with `\\password`, which keeps it out of your shell history and the server logs:\n\n```sql\nSHOW password_encryption;\nCREATE ROLE appuser WITH LOGIN;\n\\password appuser\nCREATE DATABASE appdb OWNER appuser;\n```\n\n   Modern PostgreSQL versions default to `scram-sha-256` for newly set passwords, but existing passwords keep whatever hash they were stored with until they are reset. This matters because a `scram-sha-256` rule in `pg_hba.conf` only works for passwords stored as SCRAM. If `SHOW password_encryption;` doesn't say `scram-sha-256`, run `SET password_encryption = 'scram-sha-256';` before setting the password. Afterwards, check the stored hash as a superuser:\n\n```sql\nSELECT rolname, left(rolpassword, 14) AS hash_prefix\nFROM pg_authid WHERE rolname = 'appuser';\n-- expect: SCRAM-SHA-256$\n```\n\n3. **Allow exactly one user, one database and one address in `pg_hba.conf`.** Add this line:\n\n```conf\n# TYPE    DATABASE  USER      ADDRESS           METHOD\nhostssl   appdb     appuser   203.0.113.10/32   scram-sha-256\n```\n\n   Here is what each part does:\n\n   - `hostssl` accepts only encrypted connections. A plain `host` line would also allow unencrypted ones.\n   - `/32` means a single IPv4 address. Use something like `/24` only if you really mean a whole subnet. IPv6 clients need their own line.\n   - `scram-sha-256` is the password method. Never use `trust` for anything that isn't a local socket.\n   - Rules are read top to bottom and the **first match wins**. If a connection matches a rule and authentication fails, PostgreSQL does *not* try the next rule. So a broad rule above your narrow one will override it, and your new line is only as safe as everything above it.\n\n4. **Set up TLS properly.** `ssl = on` gives you encryption, but encryption alone doesn't prove you are talking to *your* server. First, see what the cluster is currently using:\n\n```sql\nSHOW ssl;\nSHOW ssl_cert_file;\n```\n\n   Depending on how it was installed, a cluster may be using a self-signed \"snakeoil\" certificate, which clients cannot verify. For anything real, use a certificate whose name matches how clients connect: the DNS name (`db.example.com`) as a subject alternative name, or an IP address SAN if clients connect by IP. Then point PostgreSQL at it in `postgresql.conf`:\n\n```conf\nssl = on\nssl_cert_file = '/etc/postgresql/ssl/server.crt'\nssl_key_file  = '/etc/postgresql/ssl/server.key'\n```\n\n   The private key must not be readable by group or others. If the key is owned by the `postgres` user, `chmod 600` is the right permission.\n\n5. **Apply the changes and check them.** `listen_addresses` and the TLS settings need a restart, and `pg_hba.conf` alone needs only a reload:\n\n```bash\nsudo systemctl restart postgresql\n```\n\n   Then check that PostgreSQL parsed your rules without errors, and read the **whole** list from top to bottom:\n\n```sql\nSELECT line_number, type, database, user_name, address, auth_method, error\nFROM pg_hba_file_rules;\n```\n\n   If the `error` column has anything in it, fix that line first. Then look for older lines that are broader than yours: a `host all all 0.0.0.0/0 ...` rule, any `trust` method, or a wide subnet. Those matter more than the line you just added.\n\n6. **Add the firewall rule last, scoped to the same address:**\n\n```bash\nsudo ufw allow from 203.0.113.10 to any port 5432 proto tcp\n```\n\n   Now you have three layers. If PostgreSQL runs in Docker, though, these host-level settings are not enough on their own. What is exposed depends on how the port is published (`-p 127.0.0.1:5432:5432` versus `-p 5432:5432`), on the container's own `listen_addresses` and `pg_hba.conf` (the official image is typically configured to accept connections from any address inside the container network), on which Docker firewall backend you use, and on any cloud firewall in front. Docker-published ports also bypass UFW, so use the `DOCKER-USER` approach from the previous post instead of relying on this rule.\n\n7. **Test from the client with certificate verification:**\n\n```bash\npsql \"host=db.example.com dbname=appdb user=appuser sslmode=verify-full sslrootcert=/path/to/ca.crt\"\n```\n\n   `verify-full` checks that the certificate was issued by a CA the client trusts *and* that its name matches the host you connected to, which protects against someone impersonating the server. The name you connect with must resolve to the intended server and match the certificate. By comparison, `sslmode=require` encrypts the connection but does not reliably verify who is on the other end, so use it only for a quick first test.\n\n   Then confirm the session really is encrypted:\n\n```sql\nSELECT ssl, version, cipher FROM pg_stat_ssl WHERE pid = pg_backend_pid();\n```\n\n8. **Confirm other connections are refused. Don't just assume it.** From a machine that is not on your allow list:\n\n```bash\nnmap -Pn -p 5432 your.server.ip\n```\n\n   The port should show as filtered or closed. From the *allowed* address, also try a different role or database. You should get an error like `no pg_hba.conf entry for host ...` instead of a login prompt. On the server, `ss -tlnp | grep 5432` should list only the addresses you chose, not `0.0.0.0` or `[::]`.\n\nYou now have a narrowly scoped configuration. PostgreSQL listens on the interfaces you chose, the intended client is authorized for one database and one role, TLS is required and verified, and the firewall restricts access to the permitted source address. Before you conclude that everything else is blocked, make sure you have read the full `pg_hba.conf` rule list and checked every firewall layer in front of the server, including any cloud security group.\n\nUnrelated but make sure you never test remote access by temporarily setting `host all all 0.0.0.0/0 trust` \"just to see if it works.\" Temporary rules like that are the ones that get forgotten and end up in production.",
      },
      {
        subtitle: "Reference",
        content:
          "- [PostgreSQL docs: The pg_hba.conf file](https://www.postgresql.org/docs/current/auth-pg-hba-conf.html)\n- [PostgreSQL docs: Connections and authentication](https://www.postgresql.org/docs/current/runtime-config-connection.html)\n- [PostgreSQL docs: Password authentication](https://www.postgresql.org/docs/current/auth-password.html)\n- [PostgreSQL docs: Secure TCP/IP connections with SSL](https://www.postgresql.org/docs/current/ssl-tcp.html)",
      },
    ],
  },
  {
    slug: "making-technical-debt-visible-with-sonarqube",
    title: "Making technical debt visible with SonarQube",
    description:
      "A 30-day cleanup of AegisMesh using SonarQube, turning 872 initially invisible bugs, vulnerabilities, hotspots, code smells, and duplication into measurable technical debt and a quality-gated workflow.",
    updated: "May 25, 2026",
    readTime: "3 min",
    category: "Practice",
    cardDate: "May 25, 2026",
    cardDesc: "872 hidden issues. One scan. 30 days to fix what I couldn't see before.",
    cardReadTime: "5 min read",
    keywords: "SonarQube, AegisMesh, code quality, technical debt, bugs, vulnerabilities, security hotspots, code smells, duplication, Quality Gates, React, cognitive complexity, JWT, regex, maintainability, reliability",
    sections: [
      {
        subtitle: "Why bother",
        content:
          "Before SonarQube, most checks were reactive — linting, manual review, runtime debugging. That approach misses a lot: security hotspots, duplicated logic, unstable React hooks, unsafe async handling, cognitive complexity creeping up unnoticed.\n\nThe goal wasn't perfect code. It was measurable code.",
      },
      {
        subtitle: "What the first scan found",
        content:
          "The first scan was uncomfortable. Issues that had existed for weeks, invisible until now.\n\n872 total issues on day one. 215 bugs, 76 vulnerabilities, 8 security hotspots, 90+ code smells, and ~9.7% duplicated code. Quality Gates: 0% passing.\n\nNone of it was catastrophic in isolation. The problem was accumulation.",
      },
      {
        subtitle: "Frontend problems",
        content:
          "The React frontend had issues that worked fine locally but were risky at scale — stale useEffect dependencies, unsafe state updates, duplicated validation logic, inconsistent null handling.\n\nOne component had a cognitive complexity score of 24, three duplicated validation blocks, and five hook dependency warnings. After refactoring: complexity dropped to 11, duplication gone, render stability improved.",
      },
      {
        subtitle: "Backend security findings",
        content:
          "The backend scan was more interesting. Input validation was inconsistent between routes — some payloads validated, others weren't. Not an immediate exploit, but an obvious gap.\n\nA few validators had regex patterns that could cause catastrophic backtracking under crafted payloads. Rewrote them with bounded patterns. JWT handling had duplicated token verification logic scattered across middleware — centralizing it cut auth-related duplication by 38%. A handful of debug logs were also leaking partial tokens and internal error structures, flagged as hotspots and cleaned up.\n\nNone of these were dramatic. That's kind of the point — small, risky patterns that compound over time.",
      },
      {
        subtitle: "30 days of cleanup",
        content:
          "Started at 872. Closed out at 479 — security at 21, reliability at 192, maintainability at 266, duplications down to 7.3%, and hotspots reviewed at 0.0%.\n\nStill work left. But the numbers moved, and that's the point — technical debt went from abstract to visible.\n\nTechnical debt went from abstract to visible. That made it fixable.",
      },
      {
        subtitle: "Quality gates changed the workflow",
        content:
          "Every pull request now gets scanned automatically. Builds fail if vulnerabilities exceed threshold, duplication increases, coverage drops, or critical issues appear.\n\nThe pipeline blocks obvious problems before they need manual review.",
      },
      {
        subtitle: "What I'd do differently",
        content:
          "Add SonarQube earlier. Scanning a large existing codebase all at once creates noisy reports and a backlog that's demoralizing to look at. Starting from the first commit keeps issue counts manageable and the feedback loop tight.\n\nTake security hotspots seriously from day one. Most of them weren't immediately exploitable — but they all represented unclear intent or risky patterns. Ignoring them early just defers the cleanup.\n\nWatch cognitive complexity. The hardest files to maintain were almost always the ones SonarQube flagged first. That correlation held consistently.",
      },
      {
        subtitle: "Final thought",
        content:
          "SonarQube didn't fix anything on its own. It made problems impossible to ignore — vulnerability counts, duplication percentages, complexity scores, failed quality gates. Once the numbers were visible, the work became obvious.",
      },
    ],
  },
  {
    slug: "rethinking-my-git-workflow",
    title: "Rethinking my Git workflow",
    description:
      "How moving from unmanaged folders and versioned filenames to GitHub, commits, branches, documentation, and repositories changed the way I build and maintain projects.",
    updated: "April 16, 2026",
    readTime: "3 min",
    category: "Practice",
    cardDate: "Feb 10, 2026",
    cardDesc: "Not just a code host. A place that quietly reshaped how I build.",
    cardReadTime: "3 min read",
    keywords: "Git, GitHub, workflow, version control, commit, branch, README, portfolio, collaboration, green squares, staging, push, clone",
    sections: [
      {
        subtitle: "Before GitHub",
        content:
          "My actual setup at that time was pretty messy: a folder. Inside that folder, files with names like main_final.py, main_final_v2.py, main_final_v2_REAL.py. No backup. No structure.\n\nWhen something broke — and things broke — I'd either spend an hour undoing changes by memory or just start over.\n\nI didn't know that was a bad system until I lost work I actually cared about.",
      },
      {
        subtitle: "Discovering GitHub",
        content:
          "When I finally used it properly, the first thing I did was create a repo, clone it locally, and just start pushing code.\n\nEvery time I finished something — even something small — I'd stage it, commit, push. Open GitHub, see it sitting there. Green squares filling in. It kept me going more than I expected.\n\nThe better part was opening a repo weeks later and actually being able to see what happened. Not piece it together. Just read it.",
      },
      {
        subtitle: "What Changed",
        content:
          "Version control was the first thing that actually helped. Something breaks, I find the last commit where it didn't and roll back. That spiral of \"what did I even change\" doesn't happen much anymore — and when it does, I can just check.\n\nCommit messages I still get lazy with sometimes. But even a half-decent message is better than nothing when you're staring at a diff three weeks later with no memory of what you were doing.\n\nBranches I didn't use properly for a while. Before, trying something new meant duplicating the folder or just making the change and hoping. Now I branch off, try it, merge or delete. I started finishing things I would've dropped.",
      },
      {
        subtitle: "Accidental Portfolio",
        content:
          "I wasn't thinking about GitHub as a portfolio when I started. I was just pushing code. But when I started applying for internships, having repos with real commit history and READMEs made a difference I didn't anticipate. Recruiters could just look. No explaining, no describing — just a link.\n\nCollaboration I haven't used that much yet. But the few times I have, it beat sending files over chat and hoping nobody touched the wrong thing.",
      },
      {
        subtitle: "What I Learned",
        content:
          "Commit messages actually matter. \"fix stuff\" is fine until you're debugging at midnight with no memory of what changed. Even \"fix auth redirect on logout\" takes five seconds and has saved me real time more than once.\n\nREADME files I kept skipping. Still do sometimes. But I've opened old projects with no idea how to run them — including ones I built myself. At that point documentation stops being optional.\n\nPushing regularly matters more than I thought. One big commit at the end tells you nothing about how the project came together. The history only works if you actually built it along the way.",
      },
      {
        subtitle: "Final Thoughts",
        content:
          "I avoided GitHub for a long time because it felt like extra work. It wasn't. I was just skipping the part where I treated my own projects seriously.\n\nCommit regularly. Write messages that mean something. Keep things in repos.\n\nThat's most of it — the rest you figure out as you go.",
      },
    ],
  },
  {
    slug: "how-vaultlock-reliably-fetches-brand-logos",
    title: "How VaultLock reliably fetches brand logos",
    description:
      "How VaultLock moved logo fetching out of the UI and into a dedicated backend flow using input normalization, caching, multiple fallback sources, response validation, and graceful failure handling.",
    updated: "April 8, 2026",
    readTime: "2 min",
    category: "Security",
    cardDate: "Apr 8, 2026",
    cardDesc: "Getting the right brand logo, every time, without breaking the UI.",
    cardReadTime: "2 min read",
    keywords: "VaultLock, logo, brand, favicon, Clearbit, Google, DuckDuckGo, caching, validation, QML, Qt, backend, input normalization, offline password manager",
    sections: [
      {
        subtitle: "Showing a logo sounds trivial. It isn't.",
        content:
          "In VaultLock, I needed something that could take \"GitHub\" or \"facebook.com\" and return the right icon — without crashing the UI or making external requests. Getting there took more architecture than I expected.",
      },
      {
        subtitle: "The wrong first solution",
        content:
          "The first solution was to let QML handle it: fetch the URL, render the icon. This fell apart quickly. Qt's icon components aren't consistently available across the stack. Rendering remote images caused glitches and crashes. And if the UI is making external requests based on user input, you've handed control of what gets fetched to whoever's typing.\n\nSo I moved everything into the backend.",
      },
      {
        subtitle: "Input normalization",
        content:
          "Users don't enter clean data. They type \"Google\", \"linkedin.com\", \"https://facebook.com\", or whatever they remember.\n\nThe first step is normalization — extract a domain if there's a URL, check a brand dictionary, fall back to guessing name.com. By the time anything downstream runs, the input is a clean domain.",
      },
      {
        subtitle: "Caching, then fetching",
        content:
          "Before any network call goes out, the system checks memory, then bundled assets, then disk. Most repeat lookups never hit the network at all. When they do, the request goes to one of three sources: Clearbit, Google's favicon service, or DuckDuckGo's favicon service. No user controlled endpoints.",
      },
      {
        subtitle: "Validation and storage",
        content:
          "Every response gets validated before it touches the cache: HTTP 200, at least 500 bytes, valid Content-Type, and magic bytes that actually match the claimed format. Anything that fails gets discarded. Filenames are md5 hashes of the domain; writes go to a temp file and get renamed. The plumbing is boring on purpose.",
      },
      {
        subtitle: "When fetching fails",
        content:
          "When the UI doesn't get a file path, it renders a badge — a dark gradient radiused square with the first two letters of the service name, or ?? if there's nothing to pull from.\n\nOn the backend, logo_manager.py adds the domain to failed_domains and skips it going forward. No retries. The badge stays, nothing broken gets shown.",
      },
      {
        subtitle: "UI isolation",
        content:
          "VaultLock UI doesn’t fetch, validate, or guess, it never sees any of this logo fetching process.\n\nThats why VaultLock is reliable.",
      },
    ],
  },
]

export function getBlogArticle(slug: string) {
  return BLOG_ARTICLES.find((a) => a.slug === slug)
}

export const ARTICLE_CATEGORIES = ["Artificial Intelligence", "Practice", "Security"] as const

export function getAdjacentArticles(slug: string) {
  const ordered = [...BLOG_ARTICLES].sort((a, b) => Date.parse(b.cardDate) - Date.parse(a.cardDate))
  const idx = ordered.findIndex((a) => a.slug === slug)
  return {
    previous: idx >= 0 ? ordered[idx + 1] : undefined,
    next: idx > 0 ? ordered[idx - 1] : undefined,
  }
}

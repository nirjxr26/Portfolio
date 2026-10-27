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
    slug: "context-engineering-why-agents-md-beats-a-better-model",
    title: "Context engineering: why AGENTS.md beats a better model",
    description:
      "Why repository-level rules and project context can matter more for AI-generated code quality than simply switching to a stronger model.",
    updated: "September 16, 2026",
    readTime: "5 min",
    category: "Artificial Intelligence",
    cardDate: "Sep 16, 2026",
    cardDesc:
      "Why a rules file can matter more than which AI you're using to write code.",
    cardReadTime: "5 min read",
    keywords:
      "Context engineering, AGENTS.md, CLAUDE.md, AI coding agents, AI coding, code quality, repository context, software engineering, coding assistants, developer tools",
    sections: [
      {
        subtitle: "Why rules matter more than the model",
        content:
          "I keep seeing the same debate play out: which model writes the best code. Claude versus GPT versus whatever shipped this week. People benchmark them on leaderboards, argue about which one \"feels smarter,\" and treat the model choice like it's the deciding factor.\n\nIt isn't, and I want to be specific about what I mean before this turns into another \"prompt better\" post.\n\nI'm not talking about which model makes better decisions. A stronger model will still reason through an ambiguous problem better than a weaker one, and no amount of documentation fixes that gap. I'm talking about code quality: how easy it is to understand, maintain, reuse, and keep consistent. Most of the time, when a small problem comes up, you won't always hand that task to AI. Sometimes you'll handle it yourself. And with today's tools to make the codebase more understandable and reusable, why not keep the codebase consistent?\n\nI've seen AI write separate and multiple coding patterns for different things across a backend or website simply because it didn't have enough context. In my own repos, I've repeatedly gotten cleaner, more reusable, easier-to-maintain, and more understandable code from a mid-tier model with a real rules file than from a frontier model working from a blank context.",
      },
      {
        subtitle: "The thing almost nobody sets up",
        content:
          "Most AI coding agents support a repo-level instructions file. Claude Code reads CLAUDE.md. Other agents read AGENTS.md or their own variant. The idea is simple: instead of repeating your conventions in every prompt, you write them once and the agent reads them automatically at the start of a session.\n\nPlenty of teams still aren't doing this. They'll pay for the most expensive model tier available and then hand it a blank context window every single time, as if the agent is supposed to guess their branch naming scheme or figure out on its own that a particular directory is legacy code nobody wants touched.\n\nA rules file isn't optional polish. It's the difference between an agent that writes code matching your project and one that writes code matching whatever the internet trained it on.",
      },
      {
        subtitle: "What actually goes in one",
        content:
          "This isn't a generic checklist you copy-paste into every repo. That's the mistake I see most often, someone finds a template on GitHub, drops it in unchanged, and wonders why the output still feels off. The file has to reflect the actual codebase in front of it. That said, here's roughly what I cover, grouped by what each part is actually doing.",
      },
      {
        subtitle: "The baseline",
        content:
          "The facts an agent can't infer from the code alone, no matter how well it reads.\n\n- Stack and versions. Exact framework versions, not \"React.\" I've had agents suggest patterns from three major versions ago because nothing told them otherwise.\n\n- File and folder conventions. Where new components live, how modules are named, what the test file naming pattern is. Agents will invent their own scheme if you don't give them one, and it usually won't match yours.\n\n- Existing utilities and abstractions. A running list of \"we already have a function for this, don't write a new one.\" This is probably the single highest-value section, and the one people skip most.",
      },
      {
        subtitle: "The guardrails",
        content:
          "The parts that stop an agent from doing technically-reasonable things you don't actually want.\n\n- What not to touch. Legacy modules, generated files, anything mid-migration. This one saves more time than almost anything else on the list.\n\n- Security constraints. Anything touching auth, secrets, or user data gets flagged explicitly, because this is the category where I want zero improvisation.\n\n- Scope discipline. What counts as in scope for a given change and what doesn't. Without this, an agent will \"improve\" formatting in a file it was never asked to touch, and your diff triples in size for no reason.\n\n- Solution sizing. A cap on how big a fix should be relative to the problem. Left alone, a model will reach for a new abstraction layer or config system when a two-line change would do.",
      },
      {
        subtitle: "The process",
        content:
          "How work gets done, not just what it should look like when it's finished.\n\n- Testing requirements. Whether tests are mandatory for new code, which framework, and what coverage actually matters versus what's just noise.\n\n- Error handling patterns. How your codebase actually handles failures, not the generic try/catch the model defaults to.\n\n- Commit and PR conventions. Message format, branch naming, whether commits should be atomic or squashed.\n\n- A required sequence. Understand, plan, implement, verify, review, spelled out explicitly rather than assumed. Left to itself, an agent will implement first and verify never, or call something done without running the tests it claims to have run.\n\nNone of this is exotic. It's the stuff a competent new hire would ask about in their first week. The difference is the agent won't ask. It'll just guess, and the guess will look plausible enough that you might not catch it in review.",
      },
      {
        subtitle: "Domain rules aren't style rules",
        content:
          "Everything above keeps the code looking consistent. It doesn't keep it correct, and those are different problems.\n\nIn one of my forensic-tooling projects, closed cases can never transition back to open. Case IDs are immutable once assigned. Every mutation has to travel through the application service rather than touching the ORM directly from a CLI layer, no shortcuts. None of that is a formatting preference. It's a business rule the codebase depends on, and it's exactly the kind of thing an agent will violate without hesitation if you don't spell it out, because \"add a quick fix that reopens a case\" reads as a completely reasonable request until you know it isn't.\n\nIf a project has hard invariants like this, they get their own section, separate from general style. Burying \"cases can never reopen\" in the same list as \"we use camelCase\" means it gets read with the same weight as a formatting preference, and it's not one. It's the one rule in the whole file you genuinely can't afford to have ignored.",
      },
      {
        subtitle: "Different models, different files",
        content:
          "One thing I've had to adjust: the same rules file doesn't perform identically across models. Some agents follow terse, bulleted instructions well. Others need more explicit examples of the pattern you want, a before-and-after, not just a description of it. \n\nOn one project, \"reuse the existing service layer\" was enough for one agent to consistently find and extend the right service. Another agent read the same line and still wrote a parallel implementation, and only stopped once I added a concrete example showing which service to reuse and which pattern not to reintroduce. I've ended up keeping model-specific variants for a couple of projects rather than one universal file, because instructions tuned for one agent produced noticeably worse adherence on another. It's annoying to maintain, but it's less annoying than fixing the output afterward.",
      },
      {
        subtitle: "The part people skip: making the codebase legible to a new agent",
        content:
          "Rules files handle behavior. They don't handle context, and a repo of any real size has a lot of it that isn't visible from the code alone. Why a particular service is structured the way it is. Which parts are being actively migrated. What broke last time someone touched the payment logic without reading the three-year-old comment explaining why.\n\n### Building the index\n\nI keep this in a separate notes system, Obsidian in my case, though Notion works the same way. Not as a replacement for code comments, but as an index: what each major component does, why certain decisions were made, what's currently in flux. When I bring a new AI agent into an unfamiliar part of the codebase, pointing it at that index gets it oriented faster than letting it infer the architecture from file names and hope for the best.\n\nThink about onboarding a new engineer. You wouldn't hand them the repo and nothing else. You'd walk them through the architecture, or at least point them at a doc that does. AI agents need the same thing, and most people don't bother because it feels excessive to write documentation for something that isn't human. It isn't excessive. It's the same onboarding problem, just with a different kind of new hire.",
      },
      {
        subtitle: "Where this actually lands",
        content:
          "None of this makes a weak model outreason a strong one. It won't fix bad architectural decisions or catch a subtle logic error the model wasn't capable of spotting in the first place. What it does is close the gap on everything downstream of the decision: the actual code that gets written, how well it fits what's already there, how much cleanup you're doing afterward.\n\nA better model gives you better reasoning. Better repository context gives that reasoning somewhere useful to land.",
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
  {
    slug: "ai-agents-have-permissions-now-but-whos-in-control",
    title: "AI agents have permissions now — but who's in control?",
    description:
      "A chatbot gives you bad information. An agent takes bad actions. Why agent security is an authorization problem, not a model-quality problem — and what to actually do about it.",
    updated: "September 15, 2026",
    readTime: "9 min",
    category: "Artificial Intelligence",
    cardDate: "Sep 15, 2026",
    cardDesc: "A chatbot lies to you. An agent acts on it — why that's an authorization problem.",
    cardReadTime: "9 min read",
    keywords: "AI agents, IAM, authorization, least privilege, OAuth, non-human identity, prompt injection, insider threat, short-lived credentials, infrastructure as code, AegisMesh, deployment security",
    sections: [
      {
        subtitle: "A chatbot can lie to you. An agent can act on it.",
        content:
          "A chatbot gives you bad information. You read it, you're annoyed, you move on.\n\nAn agent takes a bad action. It merges the PR. It deletes the table. It sends the wire.\n\nThat's the whole gap this post is about. Everyone's already built around the fact that LLMs get things wrong — review steps, guardrails, fallback logic. Nobody's finished figuring out what happens once that same, still-fallible system has a login.\n\nBecause it already does. Somewhere in your stack right now, there's probably an agent holding a GitHub token, an AWS role, read access to a database, maybe a Slack bot token or an inbox it can send from. Some of them touch Kubernetes. A few touch production directly.\n\nI work in identity and access management, so I'll say my bias up front: most of the industry is treating this as a model-quality problem when it's really an authorization problem. You don't fix bad access control by making the thing asking for access smarter. You fix it by not giving it access it doesn't need.",
      },
      {
        subtitle: "The ladder nobody drew on purpose",
        content:
          "Nobody designed this progression on purpose. Each step just looked like a small, reasonable move up from the last one.\n\nA chatbot answers questions and does nothing. An AI assistant drafts things and still does nothing on its own. An AI agent takes actions and needs tool access. An agent with tools calls APIs, reads and writes real systems. An agent with identity authenticates as something and holds credentials. An agent with production access can change the state of the business.\n\n`Let it draft the PR` becomes `let it open the PR`. That becomes `let it merge small PRs`. Eighteen months later, nobody quite remembers agreeing to any of it, but there's a bot account with write access to main and a Slack channel full of its commits.\n\nAccess always drifts this way, human or not. It gets granted under pressure and rarely revoked, because nobody wants to be the one who breaks the demo by tightening the scope.\n\nAgents just move through that drift faster. Provisioning one is a config change, not a ticket to IT.",
      },
      {
        subtitle: "The token question that doesn't have a clean answer",
        content:
          "Here's the one that actually gets to me: if an agent is holding an OAuth token, whose identity is that token?\n\nNot really the user's. The user isn't the one calling the API at 3 a.m. while the agent chews through a backlog.\n\nNot really the agent's either, since `the agent` isn't a stable thing. It's a process that spins up, does something, and disappears — sometimes running a different model version or a different prompt than the one that fetched the token in the first place.\n\nTraditional IAM has a clean answer for the human case: the token represents a person, that person is accountable, you can ask them what happened. Service accounts stretched that model already, but they still represented one fixed, well-understood job. An agent breaks it further, because it reasons — it decides at runtime which tool to call and why. What it does is a function of the prompt, the context, and whatever it decided made sense in the moment, not a role you can point to on a diagram.\n\nA 2026 Cloud Security Alliance survey found that 68% of organizations can't reliably tell an AI agent's activity apart from a human's in their own logs. That's not a future risk. That's the current state of visibility at most companies running agents today.",
      },
      {
        subtitle: "So who's responsible when it breaks something",
        content:
          "This is the question every security team gets cornered into answering — usually right after an incident, the worst possible time to be figuring out policy for the first time.\n\nIs it the developer who wrote the system prompt? The team that granted the IAM role? The vendor whose model ran `DROP TABLE` because it misread the instruction? The company that deployed it with no human approval gate on destructive actions?\n\nMy honest answer: the org that granted the access is accountable, full stop. Same as you're accountable for a junior engineer's mistakes if you hand them prod credentials on day one with no review process. `The AI did it` isn't a liability shield — it's an admission that nobody scoped the blast radius before flipping it on.\n\nThe fix isn't a better model. It's the boring IAM work most teams were already planning to get to eventually.",
      },
      {
        subtitle: "Should an agent be allowed to create infrastructure?",
        content:
          "I go back and forth on this one more than anything else here.\n\nThe case for yes: agents are genuinely good at infrastructure-as-code. Terraform, CloudFormation — structured, pattern-heavy work is exactly where LLMs are strong, and letting an agent stand up a dev environment on request is a real productivity win.\n\nThe case for no, at least not yet: infrastructure creation can quietly cost you money, open a network path, or leave a resource nobody remembers to tear down — and it can do all three without tripping anything that looks like an incident. A confused agent with `terraform apply` access isn't just a data risk. It's a standing invitation to run up your cloud bill or open a door you find in an audit eighteen months later.\n\nWhere I've landed, for anything touching a real environment: agents generate the plan. A human approves the apply. Not because the code is usually wrong — half the time it's fine. Because `fine most of the time` is a bad bar for anything with a real cost and a real blast radius attached to it.",
      },
      {
        subtitle: "Permanent credentials are the mistake we already know not to make",
        content:
          "We learned this with humans a decade ago. Now everyone's relearning it with agents.\n\nA recent industry report on non-human identity management put the share of non-human credentials that never get rotated on any recommended schedule at 71%. Only about 20% of organizations have a real process for offboarding or revoking API keys once they're no longer needed.\n\nEstimates of the non-human-to-human identity ratio vary by source — CyberArk has cited 80:1, the Cloud Security Alliance a more conservative 45:1. Every count agrees on the direction. It's growing, and agents are the fastest-growing slice of it.\n\nI think about this constantly on AegisMesh, the IAM platform I've been building. The whole deny-first design exists because a static, long-lived credential is a liability from the moment it's created — the only question is when it gets used against you, not if.\n\nFor anything with real-world write access, an agent shouldn't hold a permanent secret. Short-lived, scoped, automatically expiring credentials, reissued per task, are what actually survive a compromised prompt or a misbehaving tool call. There are narrower cases — a sandboxed agent with no real write access — where a longer-lived credential is a defensible trade-off. But as a default, permanent credentials are the same mistake we already made with service accounts, just moving faster this time.",
      },
      {
        subtitle: "What this looks like when it goes wrong",
        content:
          "All of this is easy to wave off as theoretical until you walk through one concrete path. Say a developer types something completely ordinary into a deployment agent: `Deploy the latest version to production.`\n\nUnder the hood that turns into a chain: the agent reads the GitHub repo, generates the Terraform or deployment config, calls the AWS API, assumes an IAM role — and production changes.\n\nEvery arrow in that chain is a place this can go wrong. None of them require anything as dramatic as a hack.\n\nWhat if the repository contains a prompt injection? A README comment, a commit message, a config file the agent reads for context — any of it can carry text crafted to look like an instruction. The agent isn't separating `content I'm reading` from `commands I should follow` as cleanly as we'd like. If that hidden text says to also update the payments webhook URL, a capable agent may just do it, as part of the job it thinks it was asked to do.\n\nWhat if the agent interprets `latest version` incorrectly? Latest merged commit, latest tagged release, latest commit on a long-lived release branch — a human on the deploy team catches that ambiguity instantly. An agent that guesses wrong doesn't throw an error. It deploys, confidently, and the first sign of trouble is a production incident.\n\nWhat if the deployment tool has broader permissions than the agent actually needs? This is the one that turns a small mistake into a big one. If the IAM role behind that Terraform call has write access to the whole account instead of one service, every failure above inherits that same wide blast radius. The agent didn't need admin access to do its job. It had admin access because scoping the role precisely was more work than attaching AdministratorAccess and moving on — which is how most human IAM messes start too.\n\nNone of these require the agent to be hacked. Each one is the agent doing exactly what it was built to do, with one link in the chain slightly wrong. There's often no exploit to point to afterward. Just a permission that was wider than it needed to be, and an action taken faster than anyone could review it.",
      },
      {
        subtitle: "The insider threat framing is right, and it's worse than it sounds",
        content:
          "CyberArk's VP of cyber research, Lavi Lazarovitz, has described AI agents as a new class of digital coworker — one that reasons and acts autonomously instead of following a fixed script. Security researchers writing about agent identity have started calling this exactly what it is: a new insider threat.\n\nThat's the right frame. An insider threat is dangerous specifically because it already has legitimate access. The damage doesn't come from breaking in — it comes from what a trusted identity does once it's inside. That's the shape of an overprivileged agent: no breach required, just a normal, authenticated action that happened to be the wrong one, at machine speed.\n\nAnd it's not staying single-agent. As multi-agent setups become normal — a coding agent handing off to a deployment agent, a support agent pulling context from a data agent — you get a new failure mode: agents manipulating or exploiting other agents. Prompt injection isn't just a way to fool a person's chatbot anymore. It's a way to pivot from one compromised agent into whatever the next one in the chain is trusted to touch. Lateral movement, wearing an AI costume. Most agent architectures have zero segmentation between agents the way we'd expect between network zones.",
      },
      {
        subtitle: "What this actually means if you're building with agents right now",
        content:
          "Not a grand theory. Just what I'd actually do.\n\nGive every agent a named human owner. If nobody can explain why an agent has an identity, it shouldn't have one.\n\nScope permissions to the task, not the team. `Reads the customer table` isn't a scope. `Reads order status for the ticket it's currently handling` is closer.\n\nDefault to no permanent credentials for anything with real write access. If your framework doesn't support short-lived tokens per task, that's a gap to close before you scale usage.\n\nPut a human approval gate on anything destructive or irreversible — prod deploys, infra creation, moving money, deleting data.\n\nLog agent actions as agent actions. Don't let them blend into human audit trails where nobody can tell the difference later.\n\nTreat agent-to-agent calls as a trust boundary, not an internal detail. You wouldn't let one microservice call another with no auth check. Don't let one agent hand off to another with no check on what it's allowed to ask for.\n\nNone of this is exotic. It's the same deny-first, least-privilege thinking IAM has preached for years, applied to an identity type that reasons about what it wants before it asks for it.\n\nThe chatbot era asked whether you could trust what it says. The agent era is asking whether you can trust what it's allowed to do. That's the harder question, and it's the one that actually matters now.",
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

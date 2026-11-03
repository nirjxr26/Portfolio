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
  leadImage?: { src: string; alt: string; width: number; height: number }
  disclaimer?: string
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "coding-is-taught-wrong-and-ai-exposed-it",
    title: "Coding is taught wrong, and AI exposed it",
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
    leadImage: {
      src: "/assets/article/coding_wrong.png",
      alt: "Abstract illustration of a structured geometric form on the left and fragmented shapes on the right.",
      width: 1107,
      height: 1064,
    },
    disclaimer:
      "The views and opinions expressed in this article are my own and are intended for educational and informational purposes. The arguments and recommendations reflect my personal perspective and interpretation of the cited research. They do not represent the views of any institution, organization, or affiliated entity. Nothing in this article is intended to defame, misrepresent, or infringe upon the rights of any individual or institution.",
    sections: [
      {
        subtitle: "",
        content: `Colleges still grade whether students can memorize ten-line loops from a decade ago, while the industry—and the age of AI—demands engineers who can architect APIs, audit machine-generated code, and secure real systems.

I recently sat a university Python and shell scripting exam. Somewhere in the middle of the paper, I realized two things at once: I could pass this exam half asleep, and passing it would prove almost nothing about my ability to build software.

The questions were the exact same relics that have circulated in Indian university exams for over a decade. Reverse a string. Check if a number is prime. Print a pyramid of asterisks or write a basic in-memory CRUD script in yet another language.

Because students are drilled endlessly on loops, if-else blocks, and predefined functions, they walk out of the exam hall believing they know how to program. I believed that too—until I tried to build a real project. That is when you hit a wall. You realize that the current study structure takes a shortcut around real software engineering standards. You cannot build a working application using classroom coding standards, and you certainly cannot read or understand the code running inside real production systems. The actual game of software engineering is entirely different from the one colleges are scoring.

I am writing this from inside the system—as a cybersecurity postgraduate student looking back at what undergraduate computer science teaches, for the students stuck memorizing syntax and the faculty who set the papers.`,
      },
      {
        subtitle: "Why college leaves you stuck",
        content: `The core failure of computer science education is that it confuses typing syntax with engineering software. A student can complete a three- or four-year degree living entirely inside a single file that runs top to bottom, never once encountering what real software looks like.

Nobody ships a prime number checker to production. Real software is a web service with API endpoints, a persistent database behind it, environment-specific configurations, authentication middleware, automated deployment pipelines, and structured logs you read when a service goes down.

| **Classroom Programming** | **Production Software Engineering** |
| --- | --- |
| Writing isolated scripts in a single file | Structuring multi-layered applications and APIs |
| Assuming clean, predictable user input | Validating, sanitizing, and authenticating every request |
| Keeping data in temporary memory (lists/dicts) | Managing persistent databases, transactions, and state |
| Running a program once to show the teacher | Testing, containerizing, deploying, and monitoring continuously |
| Writing every line from scratch in isolation | Reading, reviewing, and debugging code across a shared Git repo |

Consider how this gap looks on an exam paper.

- **Today's exam question:** Write a menu-driven Python program to add, search, and delete books in a library.
- **A real-world exam question:** Below is a 60-line API endpoint that accepts a username and returns that user's financial records. It runs without syntax errors. Identify the architectural and security flaws in this code, explain how a malicious user could exploit them, and rewrite the endpoint safely.

The first question tests whether you memorized a for loop. The second tests whether you can think like an engineer.

Decades before AI existed, researchers had already identified that being able to write basic syntax does not mean a student can read, trace, or comprehend how a program actually works ([Xie et al., 2019](https://doi.org/10.1080/08993408.2019.1565235); [Fowler et al., 2022](https://doi.org/10.1080/08993408.2022.2079866)). The problem of understanding code existed long before AI arrived—AI just turned that comprehension gap into a crisis.`,
      },
      {
        subtitle: "When an agent writes the code",
        content: `Code has become cheap to generate. According to the [Stack Overflow Developer Survey 2026](https://survey.stackoverflow.co/2026/), the vast majority of professional developers now use AI coding assistants or autonomous agents in their daily workflow. A student today can sit down with an AI agent, describe an application, and scaffold a working prototype in hours rather than months.

That shift changes the economics of software—and it has quietly broken the entry-level job market. Analysis cited by [SignalFire's 2025 talent report](https://www.signalfire.com/blog/signalfire-state-of-talent-report-2025) shows that junior developer job postings have fallen sharply from their 2022 peak, with new-grad hiring at major tech firms down by more than half compared to pre-AI baselines. The industry did not stop needing engineers; it stopped needing "order-takers." The junior developer whose only skill was reading a narrow ticket and typing out a basic function has been automated away.

What AI cuts is the friction of typing out an implementation. What it cannot replace is architectural judgment, verification, security auditing, and operational responsibility.`,
      },
      {
        subtitle: "The gap between generating code and understanding it",
        content: `The bigger problem is that generating software and understanding it are becoming two separate skills. A student can now build a functioning application without understanding its architecture, APIs, database transactions, or even how its components communicate. They can generate hundreds of lines of code but struggle to identify a simple bug, explain the implementation, or maintain it.

Research supports this concern. A 2025 study ([Kohen-Vacs et al.](https://link.springer.com/article/10.1007/s40593-025-00496-4)) found that undergraduates struggled more with correcting LLM-generated code than with ordinary examination tasks. Similarly, a [randomized trial at TU Munich](https://portal.fis.tum.de/en/publications/less-stress-better-scores-same-learning-the-dissociation-of-perfo/) found that students using AI achieved better exercise scores without corresponding improvements in underlying knowledge or code comprehension.

Today, with free API credits and coding agents, students routinely spin up "vibe-coded" projects without knowing what an HTTP request, a database transaction, or an API actually is. It is the equivalent of handing a calculator to someone who does not understand arithmetic: when the machine's output is off by an order of magnitude, they have no mental model to notice the error.

Professional developers already treat AI output as untrusted drafts—running, testing, and rewriting what the model hands them. If generating basic code is now nearly free, spending four years of university teaching students to manually write legacy loops is educational malpractice. That classroom time must shift to system architecture, API design, code review, and debugging.`,
      },
      {
        subtitle: "Anatomy of a bogus assignment",
        content: `To see how Indian universities keep students trapped in the past, look at standard second-year programming syllabi or standard AICTE-affiliated curricula across thousands of colleges. They are still covering variables, conditionals, loops, functions, lists, dictionaries, and basic file handling in different languages.

As an introductory six-week module for the first year, that is fine. Every beginner needs to write basic control flow by hand to build a mental model of how a computer executes instructions. The tragedy is that the curriculum treats this starting line as the finish line.

At the end of the semester, students are handed a practical paper that looks like this:

> *Develop a Student Management System in Python using classes, lists, and dictionaries. Each student record contains an ID, Name, Age, Department, and Marks. Implement a menu-driven terminal program to add, display, search, update, and delete records, and sort students by average marks.*

Students build a single-file terminal script, show the output to an external examiner for thirty seconds, collect their marks, and never touch the code again.

Why does this assignment fail to produce engineers? Because it actively rewards habits that would get code rejected in any real engineering team:

- **No persistent storage:** Every student record lives in a temporary in-memory list; close the terminal window and all data vanishes.
- **Zero input validation:** Nothing stops a user from entering an age of \`5\`, marks of \`900\`, or ten different students with the exact same ID.
- **No authentication or authorization:** Anyone sitting at the keyboard can delete or modify any student's record.
- **Single-file spaghetti:** Routing, calculation logic, and storage are dumped into one file, teaching nothing about modular architecture.
- **No automated testing or API interface:** The only proof it works is typing two fake names into a terminal menu—no other service can communicate with it, and no test suite verifies that a change didn't break existing logic.`,
      },
      {
        subtitle: "Teach the actual job",
        content: `Instead of padding the syllabus with four different programming languages that repeat the same introductory syntax, universities must use the second semester of a bachelor's degree to transition students from basic coding into foundational-to-intermediate software engineering.

Once a student understands loops, conditionals, and functions in Semester 1, legacy terminal scripts should be retired forever. From Semester 2 through the final semester, coursework and exams should require students to build, structure, secure, and review real software across five core areas:

**1. Application development**

- Stop grading terminal menus. Teach students to build APIs with proper routing, strict input validation checks, login tokens, and structured error responses.
- Introduce asynchronous programming so they understand how modern services handle concurrent requests, and enforce statically typed code using TypeScript or Python type hints so they learn how production teams prevent data-shape bugs before code ever runs.

**2. Software architecture**

- Force students out of the single-file habit. Teach project structure where routing, business logic, data access, and environment configurations are kept strictly separate across layers and modules.
- Have them implement foundational design patterns—such as Factory, Strategy, and Dependency Injection—and blend Object-Oriented and functional programming styles in practice using interfaces, composition, closures, and decorators.

**3. Data and infrastructure**

- Retire temporary in-memory lists as a storage mechanism.
- Teach students how to connect applications to real databases, write efficient queries, use an ORM (mapping database tables to code objects while understanding the SQL underneath), manage atomic transactions so partial failures do not corrupt data, and implement caching to reduce database load.

**4. Testing and reliability**

- Change the definition of "working code." Require students to write unit and integration tests using mocking for external services, and grade their code against automated test suites.
- Teach them to engineer for failure by implementing custom error hierarchies, network retries, request timeouts, and structured, searchable logs so a developer can diagnose exactly what broke in production.

**5. Performance and code quality**

- Move beyond theoretical Big-O notation on paper to applied performance engineering: picking the right data structure for real workloads, profiling running code to find bottlenecks, and refactoring slow queries or memory leaks.
- Pair this with mandatory Git version control, pull requests, and CI/CD pipelines so students learn how code is reviewed, tested, and deployed across shared repositories.

**A critical note on depth:** Every single area above is vast enough to be a career of its own, going far deeper than an undergraduate course can cover. The goal is not to turn second-year undergraduates into senior architects overnight. The goal is for students to implement these five pillars at a basic to intermediate level. Every student should leave their core semesters knowing what each concept is, why it exists, and how to wire it together inside a working project.

True depth comes later, in the specialized track they choose—whether that is Cybersecurity, Cloud & DevOps, Backend Engineering, Mobile Development, or QA Automation.`,
      },
      {
        subtitle: "Security belongs in the code",
        content: `When students start building real APIs, databases, and login systems in Semester 2, they immediately face a reality that legacy programs hide: anything connected to a network gets attacked.

Right now, universities lock security inside a separate elective or reserve it for cybersecurity majors, usually taught as dry textbook theory. That is a massive blind spot. Anyone writing a backend service or web application is building the exact surface an attacker pokes at—and AI coding assistants pour fuel on the fire. [Veracode's 2026 GenAI Code Security Report](https://www.veracode.com/resources/analyst-reports/2026-genai-code-security-report) found an average security pass rate of approximately 56% across the AI models it tested on controlled security tasks. In other words, a significant proportion of generated outputs contained detectable security weaknesses. Similarly, a [Stanford study (Perry et al.)](https://arxiv.org/abs/2211.03622) demonstrated that developers using AI assistants wrote significantly less secure code than those working alone, while simultaneously feeling more confident that their code was safe. This does not mean that all AI-generated code shipped to production is vulnerable, but it demonstrates why functional correctness cannot replace security review.

Code that looks tidy and passes basic functional checks is the exact code nobody questions during a rushed review. Secure coding at a basic-to-intermediate level must be built directly into every student's programming rubric across both web services and core application logic:

**Web and API security**

- **SQL Injection:** Building a database query by concatenating raw user input lets an attacker read, modify, or wipe the entire database. Any assignment that pastes strings into SQL should automatically fail the rubric in favor of parameterized queries:

\`\`\`python
# Vulnerable: raw user input is pasted directly into the SQL command
db.execute(f"SELECT * FROM students WHERE name = '{user_input}'")

# Safe: input is passed separately as a parameter, neutralizing injection
db.execute("SELECT * FROM students WHERE name = ?", (user_input,))
\`\`\`

- **Cross-Site Scripting (XSS):** Rendering unescaped user input in a browser allows attackers to inject malicious scripts into other users' sessions. Students must learn the difference between input validation (strictly checking what data your API accepts) and context-aware output encoding (safely escaping data depending on whether it lands in HTML body text, an attribute, a script tag, or a URL), alongside using modern frameworks that escape output by default.
- **Broken Object-Level Authorization:** Logging a user in is only half the battle. Students must learn to verify on every single request that the logged-in user actually has permission to view or modify the specific record ID they asked for—preventing attackers from stealing data simply by incrementing an ID number in the URL.
- **Traffic and Transport Defenses:** Every student building an API should know what HTTPS, Cross-Site Request Forgery (CSRF) tokens, and rate limiting protect against, and how to enable them in their framework.

**Core application and system security**

- **Passwords and Authentication:** Never store passwords in plain text or weak hashes like MD5. Teach students to hash passwords properly using \`bcrypt\` or \`Argon2\`, set strict expiration times on session tokens or JWTs, and verify token signatures on every protected route.
- **Secrets Management:** API keys, database passwords, and cryptographic signing keys belong in environment variables or a secrets manager—never hardcoded in source files or pushed to a public GitHub repository.
- **Safe Error Handling:** When an application fails, the user should see a clean, generic message (\`"Unable to process request"\`), while the detailed stack trace goes privately to the server logs. Dumping raw stack traces to the screen hands attackers a blueprint of your database schema, library versions, and file paths.
- **Dependency Hygiene:** Modern apps are 80% third-party packages. Students need to know that \`npm install\` or \`pip install\` pulls strangers' code into their project, and learn to scan dependencies for known vulnerabilities.

Again, this is not a full cybersecurity degree. Deep penetration testing, cryptography math, reverse engineering, and formal threat modeling belong in the specialized cybersecurity track. But every software graduate should be able to look at a 30-line login function—whether written by a classmate or generated by an AI—spot the SQL injection or hardcoded secret, and fix it.`,
      },
      {
        subtitle: "Where this leaves us",
        content: `The economics of software have shifted permanently: generating syntax is now virtually free, while verifying, securing, and architecting systems carries all the value. Major tech companies have already cut entry-level "order-taker" roles by more than half since 2022, and over 40% of AI-generated code in benchmark tests still contains exploitable security flaws. Continuing to spend three or four years grading handwritten loops and disposable terminal menus does not prepare students for the industry—it sets them up for obsolescence.

Universities do not need to invent a new degree to fix this; they only need to stop treating Semester 1 syntax as a four-year finish line. Retiring repetitive language drills after the first semester to teach APIs, multi-layered architecture, database transactions, automated testing, and secure coding turns students from passive code typists into engineers capable of auditing both human and machine output.

Syllabi move slowly, so students should not wait for a board of studies to rescue their careers. Take that legacy classroom script you built this semester and push it through a real production pipeline yourself: put it in Git, back it with a database, expose it via an authenticated API, write automated tests, and patch its security holes. And for the faculty and universities setting the papers: take a single cohort, replace half the memorized loop exams with code-audit and system-build assessments, and measure the difference after one year. The industry has already moved on. It is time the exam hall caught up.`,
      },
    ],
  },

  {
    slug: "allow-remote-postgresql-without-opening-it-to-the-world",
    title: "How to allow remote PostgreSQL connection with security",
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
    leadImage: {
      src: "/assets/article/From Chaos to Structured Git History.png",
      alt: "From Chaos to Structured Git History: transition from messy unmanaged files to structured branches and commits.",
      width: 1536,
      height: 1024,
    },
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

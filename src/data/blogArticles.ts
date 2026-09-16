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

// Structured export of all seven articles — single source for detail pages
// Slugs match the internal routes we expose at /articles/<slug>
export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "why-ai-cant-just-rewrite-windows",
    title: "Why AI can't just rewrite Windows",
    description:
      "Why rewriting Windows with AI is not primarily a code-generation problem, but a problem of scale, complexity, backward compatibility, and decades of accumulated dependencies.",
    updated: "June 4, 2026",
    readTime: "6 min",
    category: "UPDATE",
    cardDate: "Jun 4, 2026",
    cardDesc: "50M lines. 41 years and decades of decisions. ",
    cardReadTime: "4 min read",
    keywords: "AI, Windows, code generation, scale, complexity, backward compatibility, dependencies, Microsoft, 50 million lines, Git, context window, Gemini, Claude, Veracode, Brooks Law, multi-agent, .NET Runtime, operating system, rewrite",
    sections: [
      {
        subtitle: "The scale is hard to actually picture",
        content:
          "4,000 engineers. 1,760 daily builds across 440 branches. A git repository so large that Microsoft had to invent a custom file system just to manage it because standard Git couldn't handle it.\n\n50 million lines of code. 3.5 million files. Close to 300 GB. Built, broken, patched, and shipped for 41 years without stopping, since Windows 1.0 in 1985.\n\nI work on things that feel complex to me. AegisMesh, the IAM platform I've been building, has RBAC, a full DevSecOps pipeline, observability. It still feels manageable because I can hold most of it in my head on a decent day.\n\nNobody holds Windows in their head. I don't think any single team does either.",
      },
      {
        subtitle: "The problem isn't the code. It's everything the code is touching.",
        content:
          "Complexity in software doesn't scale the way people expect.\n\n5 components means 10 possible interactions. 100 components is nearly 5,000. Windows, with millions of components, has interactions that are for practical purposes impossible to fully account for.\n\nFred Brooks put it directly in No Silver Bullet (1986): \"The elements interact with each other in some nonlinear fashion, and the complexity of the whole increases much more than linearly.\"\n\nAnd you can't test your way out of it either. Some bugs only appear at production scale, with real users doing things nobody anticipated. No test suite can replicate 41 years of that.",
      },
      {
        subtitle: "AI can't even read Windows, let alone rewrite it",
        content:
          "Models work within a context window. Working memory, basically. Code averages about 18 tokens per line. 50 million lines means roughly 900 million tokens.\n\nGemini 3 Pro, currently the largest available context window, handles around 10 million tokens. Claude Opus 4.6 handles around 1 million. That makes the Windows codebase 90x to 900x larger than what any AI can process at once.\n\nAny AI working on Windows is always working blind to most of it. It sees one street, not the city. It can write something that looks completely correct locally and silently break something three subsystems away.\n\nI hit a smaller version of this while building DeployLens. An AI tool suggested a change that made total sense in isolation. It broke a GitHub Actions integration because the AI had no idea that dependency existed. On a 900 million token codebase, that problem doesn't just scale, it multiplies in ways that are genuinely hard to reason about.",
      },
      {
        subtitle: "AI already struggles at large codebases",
        content:
          "The numbers on this aren't great. According to a Veracode study, 45% of AI-generated code has security vulnerabilities. XSS failure rate in AI-generated code sits at 86%. In large, mature codebases, fewer than 44% of AI suggestions even get accepted. A METR study found that experienced developers are actually 19% slower on real tasks in large codebases when using AI tools.\n\nAI can't reliably understand dependency graphs, build systems, or architectural conventions. It moves a file and breaks every import pointing to the old location. Now imagine that at 50 million lines of scale.",
      },
      {
        subtitle: "Backward compatibility is the thing nobody wants to deal with",
        content:
          "Say AI wrote perfect code. Every function, every module, exactly right.\n\nStill not done.\n\nControl Panel still exists in Windows because drivers from 2012 call its functions. Windows has to run software from decades ago, drivers from manufacturers that don't exist anymore, enterprise apps embedded in hospital systems, bank infrastructure, and government workflows that nobody fully understands anymore.\n\nWhen Microsoft ships an update, they're also quietly guaranteeing that every DLL, every registry interaction, every weird edge case from 1998 still behaves the same way. Some behaviors exist specifically because an app from 2003 depended on a bug. Fixing the bug breaks the app. So the bug stays. That's not a failure, that's the deal made with the ecosystem over 40 years.\n\nAn AI rewriting from scratch can't know any of that unless someone wrote it down. Most of it wasn't.",
      },
      {
        subtitle: "\"Just run thousands of agents\" doesn't fix it",
        content:
          "Multi-agent failure rates range from 41% to 87% in practice. Coordination breakdowns alone account for 37% of all failures. Anthropic found that putting Claude in a multi-agent setup dropped performance by 35%. At 1 step, you're looking at around 95% success rate. At 10 steps, 60%. At 20 steps, 36%.\n\nThis is Brooks's Law reborn. Adding more people to a late software project makes it later. Adding more agents to a complex codebase makes it worse. At some point your job becomes building and managing the infrastructure that coordinates the agents, not writing the actual code.",
      },
      {
        subtitle: "Microsoft already tried",
        content:
          "Galen Hunt, a Microsoft Distinguished Engineer, said publicly: \"My goal is to eliminate every line of C and C++ from Microsoft by 2030. One engineer, one month, one million lines of code.\"\n\nAfter community pushback, Microsoft clarified this was a research project, not a product roadmap. They explicitly denied plans to rewrite Windows 11 using AI.\n\nTheir actual progress on the .NET Runtime, a much simpler codebase than the Windows kernel: 878 Copilot PRs over 10 months, 535 merged, 126,000 lines touched. Windows has 50 million. At that rate, it would take over 330 years to rewrite Windows. And again, this was the easy part.",
      },
      {
        subtitle: "Where this is going",
        content:
          "AI tools make me faster at the boring parts, which frees me up for the parts that actually need thinking. That's the real value, augmentation, not replacement.\n\nBut \"just rewrite it\" gets code generation and software engineering mixed up. Windows isn't slow to fix because the code is badly written. It's slow because the problem itself is irreducibly complex. 50 million lines of code. 41 years of decisions. Billions of devices. Millions of third-party applications. An entire global economy running on it.\n\nAI is powerful. But this isn't a problem you can brute-force with a bigger model.",
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
    category: "OBSERVABILITY",
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
    slug: "bastions-path-from-docker-to-kubernetes",
    title: "Bastion's path from Docker to Kubernetes",
    description:
      "The practical lessons from containerizing AegisMesh, moving it into Kubernetes, and building a Jenkins pipeline, including startup ordering, Prisma, Node versions, plugins, configuration, and build hygiene.",
    updated: "April 30, 2026",
    readTime: "3 min",
    category: "QUICK READ",
    cardDate: "Mar 22, 2026",
    cardDesc: "How Bastion ships as a single container and scales on Kubernetes without leaking host trust.",
    cardReadTime: "6 min read",
    hideFromHome: true,
    keywords: "Docker, Kubernetes, Jenkins, Prisma, dumb-init, Nginx, Vite, healthcheck, ConfigMap, Secret, .dockerignore, Node.js, CI/CD, containerization, AegisMesh, DevOps",
    sections: [
      {
        subtitle: "Starting with Docker",
        content:
          "The backend Dockerfile is three stages because of Prisma. It needs to generate a client at build time and needs a DATABASE_URL for that, even though nothing actually connects. One stage for prod dependencies, one for prisma generate with a placeholder URL, one final stage that combines both.\n\ndumb-init was an afterthought. npm start as PID 1 doesn't forward signals, so docker stop would hang indefinitely. Annoying to debug, obvious in hindsight.\n\nThe frontend was straightforward. Vite builds, Nginx serves. Separate dev Dockerfile that skips the build and runs the dev server directly.",
      },
      {
        subtitle: "Startup Order",
        content:
          "The backend kept dying because Postgres wasn't ready. The container being up and the database being ready aren't the same thing — took me longer than it should have to work that out. Added a healthcheck so the backend actually waits for connections.\n\nThe dev setup had one thing I missed until it broke. The host was overwriting files inside the container with no warning. One line to isolate them.",
      },
      {
        subtitle: "Moving to Kubernetes",
        content:
          "Didn't touch Kubernetes until Docker was stable.\n\nSame problem, different tool. You can run tasks before the main container starts — one waits for the database, one runs migrations. The app doesn't deal with any of it.\n\nDecide where config lives before writing anything. I changed my mind halfway through and lost time I didn't need to lose.",
      },
      {
        subtitle: "Jenkins",
        content:
          "I thought it would take a few hours. It took most of a week.\n\nFirst: npm not found. Jenkins had no Node on PATH. Then Prisma rejected the Node version — added a validation stage that fails immediately if it's not 20.19+, 22.12+, or 24+.\n\nThen lint ran for the first time. 20+ errors. Bad setState in effects, stale references, broken hook dependencies — none of it was new, it had just never been checked. Fixed all of it.\n\nThe thing that ate the most time wasn't any of that. A plugin I didn't install and didn't know about was breaking the entire run. Found it by reading console output until one line looked wrong.",
      },
      {
        subtitle: "What I'd Do Differently",
        content:
          "Set up .dockerignore before writing anything. I was pulling things into the build context that had no reason to be there. Builds were slower than they should've been and I only caught it later.\n\nDecide the ConfigMap and Secret split before touching any manifests. Changing it halfway through means revisiting files you already considered done. Not hard, just annoying.\n\nGive Jenkins environment setup more time than you think it needs. The Jenkinsfile is the easy part. Node not being on PATH, the wrong Node version failing Prisma, a plugin you never installed quietly breaking the entire run — that's where the time actually goes.",
      },
      {
        subtitle: "Final Thoughts",
        content: "Docker felt like overhead until it wasn't. Kubernetes made me think about things Compose lets you ignore. Jenkins was a bad week and I'd do it again.",
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
    category: "NOTES",
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
    category: "SECURITY",
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
    slug: "deploylens-finding-my-deployment-blind-spots",
    title: "DeployLens: finding my deployment blind spots",
    description:
      "What building DeployLens revealed about CI/CD security, excessive pipeline permissions, long-lived AWS credentials, CodeQL findings, and the importance of knowing exactly what version is running in production.",
    updated: "April 8, 2026",
    readTime: "4 min",
    category: "UPDATE",
    cardDate: "Feb 18, 2026",
    cardDesc: "GitHub Actions said green, CodeDeploy said otherwise — DeployLens finally showed the gap.",
    cardReadTime: "5 min read",
    hideFromHome: true,
    keywords: "DeployLens, CI/CD, pipeline, GitHub Actions, AWS, IAM, OIDC, CodeQL, SAST, ECS, SHA, deployment, visibility, security, secrets, CodeDeploy",
    sections: [
      {
        subtitle: "Your pipeline has permissions. Real ones.",
        content:
          "CI/CD tutorials frame it as a speed thing. Push code, tests run, it deploys. What they skip: your pipeline can push container images, update infrastructure, write to S3, call AWS APIs. In most early setups, mine included, those permissions are wide open.\n\nThat's what started bothering me while building DeployLens. I kept noticing how much access my GitHub Actions workflows quietly assumed. Nobody hacked me, nothing broke, but I kept asking: if someone pushed a malicious commit right now, what could the pipeline actually do with its current permissions?\n\nI didn't love where that question went.",
      },
      {
        subtitle: "The secrets problem",
        content:
          "Early on I had AWS credentials in GitHub Actions secrets. AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, injected as env vars. Standard setup, everyone does it.\n\nThen I started reading about what goes wrong. Workflows that run on PRs from forks. Compromised dependencies that exfiltrate env vars. A workflow that accidentally logs env to stdout and now your keys are in a public build log. These aren't hypothetical.\n\nI switched to OIDC. GitHub Actions can assume an IAM role directly, no stored credentials, short-lived token that expires after the job. Maybe 30 minutes of setup total. I wouldn't have touched it if DeployLens hadn't forced me to actually look at how my pipeline was talking to AWS.",
      },
      {
        subtitle: "What CodeQL found",
        content:
          "I added CodeQL to AegisMesh mostly because it looked good. Security scanning, SAST, sure.\n\nThen it flagged something. User input passing through without proper sanitization. Not catastrophic, but the kind of pattern that becomes catastrophic when the code around it changes. Fixed it in 10 minutes.\n\nThe part I keep thinking about: I wrote that code. I reviewed it. I didn't see it.\n\nStatic analysis catches a specific class of problems that humans miss not because we're careless but because we read for logic. We're checking if it does what we want, not whether it could be exploited. CodeQL doesn't read for intent. It just looks for patterns. That's exactly why it caught something I didn't.",
      },
      {
        subtitle: "The actual problem is visibility",
        content:
          "Security issues in CI/CD are usually not dramatic. It's just that nobody knows the real state of what's running. The SHA that passed CI and the container image actually serving traffic — same thing? Did the last deploy finish? Did it roll back without telling anyone?\n\nIf you can't answer those questions, you can't answer whether a vulnerable version is deployed right now.\n\nDeployLens matched commit SHAs from GitHub against ECS task definitions on the AWS side. Simple idea, genuinely annoying to implement because AWS doesn't expose that data in any obvious way. But building it changed how I think about pipelines. Less \"automation tube\" and more \"system with its own state, access, and history that nobody's watching.\"",
      },
      {
        subtitle: "What I'd tell myself at the start",
        content:
          "Don't save security for a cleanup pass. OIDC takes less time to set up than rotating leaked credentials later. Branch protection is five minutes. CodeQL is a checkbox in GitHub's UI.\n\nThe hard part was never the implementation. It was noticing the gap existed. And I only noticed because I was building something that forced me to look.",
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
    category: "SECURITY",
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

---
title: "Parapet: A 100ms Rust Site Checker"
description: "Parapet is a Rust site checker that audits CSP hashes, links, and sitemaps in about 100 ms, with no browser. Why I built it."
date: "2026-11-12"
category: "Security"
canonical: "https://nirjar.me/articles/a-100ms-rust-site-verifier"
readTime: "5 min"
---

# Parapet: A 100ms Rust Site Checker

> Parapet is a Rust site checker that audits CSP hashes, links, and sitemaps in about 100 ms, with no browser. Why I built it.

- **Published**: November 12, 2026
- **Category**: Security
- **Read Time**: 5 min
- **Canonical**: https://nirjar.me/articles/a-100ms-rust-site-verifier

Why I stopped booting a browser to verify things that are already sitting in a folder.

I renamed a heading last week. `id="architecture-review"` became `id="architecture"`. The build passed, the type checker was happy, and every link pointing at `#architecture-review` quietly started dropping readers at the top of the page. Nothing errored. I only found out because I clicked one of my own links (which, honestly, is how most of my QA works).

The thing that bothered me is that nothing was wrong in any way a tool would notice. The HTML was valid. TypeScript compiled. Vite built. The page just no longer had the element the link was asking for.

### Static sites fail quietly

My site builds into a `dist/` folder of plain files, and I've now hit three kinds of silent breakage in it:

1. **Dead anchors**: A `#fragment` stops matching any element on the destination page. The browser shrugs and scrolls to the top.
2. **Stale feeds**: A route gets deleted or renamed in a refactor, but `sitemap.xml` and `llms.txt` keep advertising the old URL. Crawlers and AI agents get a 404 from a file whose whole job is to be accurate.
3. **CSP drift**: To avoid a flash of the wrong theme, I run a tiny blocking script inline in `<head>`. With a strict Content Security Policy and no `'unsafe-inline'`, that script's SHA-256 hash has to be whitelisted in my headers. Change one whitespace character and the build still passes, but the browser refuses to run the script in production.

The standard answer is Playwright or Cypress in CI: start Node, start Chromium, load the site, run its JavaScript, query the DOM. That costs 30 to 60 seconds and a few hundred MB of RAM, plus the occasional flaky timeout. And the question I was asking was never about browser behavior. It was “does this id exist in that file?” Checking that by launching Chromium is a bit like testing a recipe's ingredient list by cooking the dish.

So I wrote [Parapet](https://github.com/nirjxr26/parapet), a small Rust binary. It never touches a live server. It reads `dist/` right after the build and fails the pipeline if anything is off.

It has three dependencies (`sha2`, `base64`, `regex`) and does three jobs.

## 1. Anchors, in two passes

I assumed this one would need a real browser. It doesn't. A file is just a string, so pass one walks `dist/`, pulls every id and name out of every HTML file with a regex, and stores them in a map:

```rust
let mut ids: HashMap<PathBuf, HashSet<String>> = HashMap::new();
for file in &html_files {
    ids.insert(
        file.clone(),
        extract_ids(&fs::read_to_string(file)?),
    );
}
```

Pass two scans every `<a href>`, `<link href>` and `<script src>`. Each reference gets its domain stripped, rewrites from `vercel.json` applied, and the path resolved to a file, a directory index, or an edge function. If there's a `#fragment`, it's looked up in the map:

```rust
if !ids[&target_file].contains(anchor) {
    report.error(format!(
        "Broken anchor in '{}': {}#{}",
        file.display(), target, anchor
    ));
}
```

The error names the exact page and the exact missing id, so a failure is a one-line fix instead of an investigation.

## 2. Sitemap and llms.txt

These get the same treatment as any other page. Every `<loc>` and every listed URL has to resolve to something that exists in the build:

```text
sitemap.xml
    /about          ok
    /projects       ok
    /old-project    MISSING  →  build fails
```

A dead URL in a sitemap wastes crawl budget. A dead URL in `llms.txt` is worse, because an AI agent trusts it and either fails the retrieval or makes something up to fill the gap. (I suspect the second case is more common than anyone is measuring.)

## 3. CSP hashes

This is the check I care about most, because the failure is invisible until production. A strict policy looks like this:

```http
Content-Security-Policy: default-src 'none'; script-src 'self' 'sha256-PN9A…';
```

The browser hashes each inline script and runs it only if the hash is on that list. So Parapet does what the browser will do. It finds every executable inline script in `index.html` (skipping data blocks like `application/ld+json`), hashes it, and confirms the hash appears in both `public/_headers` and `vercel.json`:

```rust
let hash = format!(
    "sha256-{}",
    BASE64_STANDARD.encode(Sha256::digest(script))
);
if !manifest.contains(&format!("'{}'", hash)) {
    report.error(format!(
        "{} is missing inline script hash '{}'",
        name, hash
    ));
}
```

Edit the theme script, forget to regenerate the headers, and the build dies with Security Manifest Drift. I don't trust myself to copy a hash into two files by hand, so I stopped asking myself to.

## How much faster is it?

A real run against my site, right after a build:

```text
🔍 Checking build integrity with Parapet...

══════════════════════════════════════════
  PARAPET INTEGRITY REPORT
══════════════════════════════════════════
  HTML Pages Scanned:      17
  Links & Assets Checked:  272
  Sitemap URLs Verified:   18
  LLMs.txt URLs Verified:  20
  Inline Scripts Audited:  1
  Elapsed Time:            110.82ms

  Status: [ PASSED ] All links, assets, sitemap URLs, and CSP hashes verified.
```

| Metric | Parapet | Playwright | Node regex script |
| :--- | :---: | :---: | :---: |
| **Time** | **0.11 s** | ~42 s (380x slower) | ~1.8 s (16x slower) |
| **Memory** | **< 12 MB** | ~650 MB (54x more) | ~110 MB (9x more) |
| **Anchor checks** | **Yes** | Yes (slow) | Partial |
| **CSP hash checks** | **Yes** | No | No |
| **CI needs** | **One binary** | Node, Chromium | Node |

That's roughly 380x faster than the browser at about 55x less memory. Most of Playwright's time is Chromium starting up, so this isn't really a fair fight. That's sort of the point: the browser is doing work this problem never needed.

## What it doesn't do

- **It isn't a replacement for Playwright.** It only replaces the checks that never needed a browser. It can't tell whether a button works, a modal opens, JavaScript crashes, or the layout breaks on a small screen.
- **It only sees the built files.** Ids or links created by JavaScript at runtime are invisible to it.
- **It reads HTML with regexes, not a full parser.** Unusual markup could slip past it.

## What's next

Once a check takes a tenth of a second and needs no network, it stops being a CI chore and just becomes something that runs on every build. The next step is moving it into a pre-push hook, so I find the broken anchor before I push instead of after. After that, the same approach should work for other things that live in the build output: canonical tags, missing image alt text, duplicate ids. Probably.

The name comes from the low wall at the edge of a roof, the thing between you and the drop. Parapet is MIT-licensed and small enough to read in one sitting: [github.com/nirjxr26/parapet](https://github.com/nirjxr26/parapet).

*Parapet was built for my own workflow and tailored to verify this website. It targets the specific silent breakages I kept running into, and it has passed on every build of this site since I added it. The project is actively accepting contributions — if you adapt it for your own site's setup and think it could be useful to others, feel free to open a PR on [GitHub](https://github.com/nirjxr26/parapet).*

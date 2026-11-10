# Security Policy

_Last updated: 2026-11-01_

## Scope

This policy covers the `nirjar.me` website and the repository that builds it
(`portfolio`). The site is a fully static frontend — React + Vite, with
per-route head metadata pre-rendered at build time and body content hydrated
client-side, served from a CDN host. There is no backend, no database, no
authentication, no user accounts, no cookies, and no user input accepted
anywhere on the site. The only third-party request is a cookieless,
domain-restricted Umami Cloud analytics script; it is described under
"Application surface" below.

**Out of scope:** vulnerabilities in third-party infrastructure the site
happens to run on (Vercel, GitHub, the CDN, DNS registrar) — report those
directly to the vendor. Also out of scope: missing security headers on
unrelated subdomains not covered by this repo, and issues that require
physical or social-engineering access.

## Reporting a vulnerability

- **Contact:** nirjargoswami2626@gmail.com (also published at
  `/.well-known/security.txt`)
- **Include:** the affected URL or file, steps to reproduce, and the impact
  you see.
- **Response time:** acknowledgement within 5 business days, with a status
  update at least every 7 days until the issue is resolved.
- **Disclosure:** please give us the chance to ship a fix before any public
  writeup. We're happy to coordinate a disclosure date and to credit
  reporters who want credit.

### Safe harbor

Good-faith security research under this policy is authorized. We will not
pursue legal action against reports made in good faith that avoid privacy
violations, data destruction, and service disruption. Specifically:

- Do not exfiltrate, modify, or delete data that is not yours.
- Do not run denial-of-service tests.
- Do not use social engineering or physical access against maintainers,
  users, or infrastructure providers.
- Test only against the production site or your own local clone — never
  against third-party services the site depends on.

## What protects this site

### HTTP security headers (production)

Every response carries:

- `Content-Security-Policy` starting from `default-src 'none'`, with no
  `unsafe-inline`. Scripts and styles are same-origin except for the Umami
  analytics origins (`cloud.umami.is` for the tracker and `gateway.umami.is`
  for ingestion). The single executable inline `<script>` (a pre-paint theme
  setter) is allowlisted by exact SHA-256 hash, so any tampered or injected
  inline script is blocked by the browser. Local development uses a
  documented, relaxed policy because the Vite dev server legitimately
  requires inline execution — that policy never ships to production.
- `frame-ancestors 'none'` plus `X-Frame-Options: DENY` (clickjacking
  protection).
- `X-Content-Type-Options: nosniff` and
  `Referrer-Policy: strict-origin-when-cross-origin`.
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.
  The domain is preload-ready; submission to the HSTS preload list is pending.
- `Cross-Origin-Opener-Policy: same-origin`,
  `Cross-Origin-Resource-Policy: same-origin`,
  `Cross-Origin-Embedder-Policy: credentialless`,
  `Origin-Agent-Cluster: ?1`.
- A locked-down `Permissions-Policy` (camera, microphone, geolocation,
  payment, USB, and sensors all disabled).

There is intentionally no `Report-To` / `NEL` endpoint: with no backend there
is nowhere trustworthy to receive violation reports, and a dead reporting
endpoint would only fake monitoring. If a collector is ever added, reporting
headers ship alongside it.

### Transport

HTTPS everywhere with the HSTS `preload` directive. Because HSTS is set with
`includeSubDomains`, every subdomain (including the blog host) must keep
valid HTTPS before the preload entry is submitted or renewed — a lapse would
break the whole domain, not just the subdomain in question. Preload
submission is pending, so do not treat the domain as preloaded yet.

### Application surface

- No inline styles and no executable inline scripts ship in production
  output other than the hash-allowlisted theme setter (verified against the
  build artifacts, not just the source).
- No `dangerouslySetInnerHTML`, `eval`, or dynamic code loading; all rendered
  strings are either static content or React-escaped.
- Error paths render a generic message with no stack traces or internals.
- Fonts are self-hosted (`/fonts`, immutable caching). The only third-party
  request is Umami Cloud analytics: it is cookieless, restricted to
  `nirjar.me` and `www.nirjar.me` via `data-domains`, and sends pageviews to
  `gateway.umami.is`. There are no trackers, pixels, ad networks, or other
  beacons.

### Supply chain

- Runtime dependencies are `react` and `react-dom` only; everything else is
  build tooling. `package-lock.json` is committed for reproducible installs.
- `npm audit` (critical level) and a full production build run on every pull
  request and merge, plus a weekly scheduled audit. Dependabot opens weekly
  npm updates.
- GitHub Actions are pinned to immutable commit SHAs, not mutable tags.
- CodeQL (`security-extended`, JavaScript/TypeScript) scans on push, pull
  request, and a weekly schedule.
- No sourcemaps ship in `dist/`, so production JavaScript exposes no original
  source paths or comments beyond minified code.

### Content integrity and routing

- All routes ship build-time-rendered head metadata with per-route canonical
  URLs, Open Graph/Twitter metadata, and JSON-LD structured data generated
  from a single shared schema library, so crawler-facing metadata cannot
  drift from the app's runtime output. Body content is hydrated client-side.
- Renamed article URLs keep permanent (301) redirects. `sitemap.xml` is
  regenerated every build with source-file timestamps. `robots.txt` allows
  crawling, including major AI indexers, and declares the sitemap.
- Machine-readable disclosure lives at `/.well-known/security.txt`
  (RFC 9116), cross-referenced with this file.

### Secrets

There are no secrets in this repository — no API keys, tokens, certificates,
or `.env` files. Contact details shown in the UI are public by design. If a
secret is ever committed by mistake, rotate it first, then purge it from
history — never the reverse order.

## Response process

1. Triage the report and reproduce it against the current `main` build.
2. Fix forward in the repository; verify with typecheck, a production build,
   and inspection of the build output.
3. Deploy. The static host supports instant rollback to the previous build
   if the fix misbehaves.
4. Credit the reporter if they want it, and note the fix in the changelog
   if one exists.
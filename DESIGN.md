# Website Design System

This is the implemented design language of `nirjar.me`. It describes the tokens,
components and patterns that exist in `src/`. The code is the source of truth;
this document is the map. `DESIGN-apple.md` holds the original visual reference
and rationale.

## Direction

The site is a quiet gallery for engineering work. Content and product mockups
carry the page; the interface around them recedes.

- **Product first.** Hero visuals, console mockups and card art get the space.
  Chrome stays minimal.
- **Two surfaces, one accent.** Sections alternate `canvas` and `surface-alt`.
  One blue accent carries every interactive element.
- **No decoration for its own sake.** No gradients, no borders on chrome, no
  shadows on headings, no second brand colour.
- **Confident type.** Large display headlines, tight tracking, muted body copy.
- **Motion with one voice.** A single easing curve, short durations, and a hard
  stop when the user asks for reduced motion.

## Colour tokens

Defined in `src/tokens.css`, exposed to Tailwind as `bg-canvas`, `text-ink`,
`border-hairline`, etc. via `@theme inline`.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--canvas` | `#ffffff` | `#000000` | Page and hero background |
| `--surface-alt` | `#f5f5f7` | `#111112` | Alternating sections, footer, ghost controls |
| `--card` | `#ffffff` | `#1d1d1f` | Raised card surface |
| `--ink` | `#1d1d1f` | `#ffffff` | Headlines, primary text |
| `--muted` | `#6E6E73` | `#b8b8bd` | Descriptions, secondary copy |
| `--hairline` | `#e0e0e0` | `#333336` | Structural dividers |
| `--accent` | `#0066cc` | `#2997ff` | Links, primary buttons, focus rings |
| `--accent-hover` | `#0071e3` | `#4aa8ff` | Hover state of the accent |

Derived text utilities live in `src/index.css`: `text-ink-soft` (90% ink)
and `text-muted-soft` (80% muted).

Dark mode is a `.dark` class on the root element. The theme script in
`index.html` applies it before paint from local storage or system preference.

## Fonts

Families use their real names in `src/fonts.css`, so the typeface is visible
in DevTools. No fallback families are declared — each token names exactly one
self-hosted family.

| Family | Role | CSS variable |
| --- | --- | --- |
| `Inter` | Display and headings | `--font-display`, `--font-inter-variable` |
| `Unifora Standard` | Interface and body | `--font-text`, `--font-univers` |
| `Berkeley Mono Variable` | Monospace | `--font-mono` |

Rules for new code:

- Use a CSS variable or a Tailwind font token (`font-display`, `font-text`,
  `font-mono`) instead of repeating a family name.
- Font files are self-hosted under `public/fonts/`. Do not add a CDN link.
- Do not add fallback families to a token; add the real `@font-face` instead.

## Type scale

Classes live in `src/typography.css` under `@layer components`.

| Class | Size | Weight / line height | Use |
| --- | --- | --- | --- |
| `t-hero` | clamp(34, 5.2vw, 56) | 600 / 1.12 | Page hero `h1`, CTA headings |
| `t-hero-headline` | 30 → clamp(34, 5.2vw, 56) | 600 / 1.12 | Case study section titles |
| `t-display` | clamp(30, 3.6vw, 40) | 600 / 1.1 | Section `h2` |
| `t-section-title` | 24 → 28 | 600 / 1.2 | Smaller section headings |
| `t-tagline` | 21 | 600 / 1.19 | Card headlines |
| `t-lead` | clamp(15, 2.2vw, 24) | 500 / 1.5 | Hero subhead, CTA body |
| `t-quote` | 20 → clamp(30, 3.6vw, 40) | 600 / 1.3 → 1.1 | Pull quotes |
| `t-body` | 14 → 16 | 400 / 1.47 | Muted card and section copy |
| `t-caption-strong` | 14 | 600 / 1.29 | Card tags, eyebrow labels |
| `t-fine` | 12 | 400 / 1.5 | Fine print |

Display sizes use `letter-spacing: -0.005em`. Body and caption copy use
`0.2px`. Headings that need descenders add the `overflow: visible` /
negative-margin pair used by `t-hero` and `t-hero-headline`.

`BODY_MUTED_CLASS` in `src/components/common/textStyles.ts` is the shared
description string (`t-body text-muted text-[15px] sm:text-base font-normal
leading-[1.5]`). Use it instead of restating the same classes.

## Spacing and layout

- **Page gutter:** `--page-gutter` = `1rem`, `1.5rem` at 414px, `2rem` at
  640px, `3rem` at 1024px. Applied by the `page-gutter` utility.
- **Container** (`src/components/layout/Container.tsx`): centred, gutter on
  both sides. `narrow` = `max-w-3xl`, default = `max-w-7xl`, `wide` =
  `max-w-6xl`.
- **Section** (`src/components/layout/Section.tsx`): full width,
  `scroll-mt-12`, `overflow-hidden`, default `py-14 sm:py-18`. Pass `padClass`
  as a whole string when an edge must change.
- **Hero padding:** `PageHero` uses `pt-32 … md:pt-44` and either `pb-0` when
  media is flush, a compact pair, or `pb-16 … md:pb-28`.
- **Card rhythm:** `p-5 min-[375px]:p-6 sm:p-8`; feature width
  `270 → 400px`, project width `280 → 520px`, wide cards `280 → 540px`.

Sections read as a pulse: light hero → alternating light/parchment bands →
contrasting CTA → footer. A case study may set `surfaceMode: "mono"` to flatten
that rhythm.

## Components

Reuse before building. The shared pieces live under `src/components/common`
and `src/components/layout`.

- **Buttons** (`Button.tsx`, `buttons.css`): `AppButton` chooses `<a>` or
  `<button>` from `href`. `PrimaryButton` / `LightButton` add an optional
  flow arrow. `ActionGroup` lays out a paired CTA row. All use the pill `.btn`
  base; primary is accent, ghost is `surface-alt`.
- **Cards** (`BaseCard.tsx`, `cards/atoms.tsx`): `BaseCard` owns radius,
  vertical spread and hover. Callers own size, padding and surface. Compose
  with `CardEyebrow`, `CardHeadline`, `CardBody` and `CARD_HEADLINE_CLASS`.
- **Sections** (`Section.tsx`): `Section` + `SectionHeader` cover the full-width
  band and the tag/title/description stack. `CarouselSection` adds the rail.
- **Hero** (`PageHero.tsx`): badge, `t-hero` title, `t-lead` subhead, optional
  flush media. Badge uses the display face, uppercase, accent.
- **Terminal mockups** (`TraceConsole`, `LayeredPreview`):
  the `console-frame` and `console-screen` utilities in `index.css` scale a
  fixed design width.
- **Icons** (`Icons.tsx`): inline SVG through `StrokeIcon`. Icons are
  `aria-hidden`; the accessible name comes from the surrounding control.

## Motion

- Shared curve: `cubic-bezier(0.16, 1, 0.3, 1)`. `SLIDE`, `SLIDE_COUNTER`,
  `TINT` and `fadeLayerClass` in `motionStyles.ts` keep view switches identical.
- Duration guide: controls 150–500ms, card hover 450ms, reveal 1.1s, hero
  entrance 1.2s with 0 / 0.25 / 0.5s stagger.
- `reveal-on-scroll` is observed once by `ScrollReveal` and then unobserved.
- `prefers-reduced-motion` disables decorative motion. Exit animations keep a
  1ms duration so their `animationend` handler still fires.
- No `will-change` on the page transition wrapper — it would become a
  containing block and break the fixed header.

## Accessibility

- Semantic tags: `main`, `section`, `h1`/`h2`/`h3`, `<a>` for navigation,
  `<button>` for actions.
- Keyboard focus uses `:focus-visible` with a 2px accent outline and 2–3px
  offset.
- Tablists follow WAI-ARIA arrow/Home/End movement via `nextTabIndex` in
  `src/utils/helpers.ts`.
- External links get `target="_blank"` and `rel="noreferrer noopener"` through
  `externalProps`.
- Respect reduced motion, keep contrast, and never hide a label with an image.

## File map

| Concern | File |
| --- | --- |
| Colour and font tokens | `src/tokens.css` |
| Type scale | `src/typography.css` |
| Buttons | `src/buttons.css`, `src/components/common/Button.tsx` |
| Keyframes and reveals | `src/motion.css`, `src/components/providers/ScrollReveal.tsx` |
| Font faces | `src/fonts.css`, `public/fonts/` |
| Global base and utilities | `src/index.css` |
| Card primitives | `src/components/common/BaseCard.tsx`, `cards/atoms.tsx` |
| Page chrome | `src/components/layout/PageShell.tsx`, `Header.tsx`, `Footer.tsx` |
| Terminal palette | `src/components/common/terminalTokens.ts` |
| Command-line mockup | `src/components/common/TraceCommandLine.tsx` (kept for reuse, not exported) |
| Case study data | `src/data/*.tsx` |

## Rules

1. Change a token or shared class, not twenty call sites.
2. Keep new components small and composable; extend an existing primitive.
3. Add no gradient, second accent, or shadow on chrome.
4. Keep responsive behaviour from mobile up; the small breakpoints matter.
5. Code-health work must not change appearance. Verify with build, tests and
   the site verifier before calling it done.

# SVG Mockup Design System

Every SVG on this site mimics a **screenshot of a real terminal window, IDE, or cloud dashboard**. This is the "screenshot-as-icon" pattern — no illustrations, no abstract graphics.

---

## Palette

| Role | Hex | Where |
|------|-----|-------|
| Deepest background | `#14120B` | Main canvas, panels |
| Panel surface | `#1B1913` | Secondary panels, title bars |
| Card frame | `#26241E` / `#17150E` | Terminal borders, card bodies |
| Text / code | `#ECECEC` / `#D4D4D8` (60–85% opacity) | Body text, monospace output |
| Success / checkmark | `#3FB950` / `#34C759` | Green values, ready state |
| YAML keys / fields | `#A78BFA` / `#B392F0` | Purple syntax highlighting |
| String values | `#F97583` / `#E01E5A` | Red quoted strings |
| Window dots | `#EDECEC` at 0.2 opacity | Three control dots |

---

## Must-have motifs

- **Three window-control dots** (5px radius circles, upper-left at ~47px Y, `fill="#EDECEC" fill-opacity="0.2"`) in every terminal/editor frame
- **Monospace font** (`font-family="monospace"`, 11–12px) for all code text
- **Thin 1px borders** separating sections (`stroke="white" stroke-opacity="0.04"` or `#6B6B70` at 0.2)
- **Flat fills** — avoid gradients (rare exceptions: pipeline flow connectors)
- **Standard card size**: 378×378 (use this for any card-level mockup)

---

## Project-specific accents

| Project | Canvas sizes | Extra colors | Vibe |
|---------|-------------|--------------|------|
| **home** | 1641×958 (hero), 518×307 (articles) | Mostly grayscale | Dashboard/UI screenshots, muted |
| **bastion** | 391–780 wide | `#326CE5` (K8s blue), `#FC0` (yellow) | Green-heavy, architecture diagrams |
| **kost** | 378×378 (most), 890×486 | `#A78BFA` purple, `#34C759` green | Terminal+YAML, syntax-highlighted |
| **hookdrop** | 378×378, 1026×405 | — | Dense pipeline forms |

---

## How to create a new SVG mockup

1. **Pick the viewBox**: 378×378 for a card, wider (600–1026) for a pipeline/architecture diagram
2. **Background**: `#14120B` for the outer rect
3. **Frame it**: add a title bar with three window dots in the upper-left, `#1B1913` fill
4. **Content**: terminal code blocks (monospace, YAML-like), panel layouts, or labeled pipeline stages
5. **Accent sparingly**: green for success/ready, purple for keys, red for strings/errors — match syntax highlighting
6. **No decoration**: no drop shadows, no bevels, no illustrations, no photographs
7. **Refer to existing files** for exact patterns: `public/icons/bastion/ci.svg`, `public/icons/kost/kh-1.svg`, `public/icons/bastion/cd.svg`

---

## Example: card-level SVG skeleton

```svg
<svg width="378" height="378" viewBox="0 0 378 378" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- outermost bg -->
  <rect width="378" height="378" fill="#14120B" rx="6" />
  <!-- title bar -->
  <rect x="0" y="0" width="378" height="40" fill="#1B1913" rx="6" />
  <!-- three dots -->
  <circle cx="20" cy="20" r="5" fill="#EDECEC" fill-opacity="0.2" />
  <circle cx="40" cy="20" r="5" fill="#EDECEC" fill-opacity="0.2" />
  <circle cx="60" cy="20" r="5" fill="#EDECEC" fill-opacity="0.2" />
  <!-- content area — terminal lines, panels, or labels -->
  <!-- use #ECECEC at 60–85% for text, #3FB950 for green values -->
</svg>
```

---

## Real examples to reference

| File | What it shows | Best for learning |
|------|-------------|-------------------|
| `bastion/ci.svg` | Multi-panel pipeline with checkmarks, arrows, hex nodes | Pipeline diagrams |
| `bastion/cd.svg` | CI/CD stages with green status dots | Deployment flow |
| `kost/kh-1.svg` | Terminal window with YAML code, purple syntax | Code screenshots |
| `kost/kd-1.svg` | Tabbed form UI with colored Slack-style icons | Form/dashboard mockups |
| `bastion/m-1.svg` | K8s architecture diagram with connected boxes | Architecture views |
| `home/hero.svg` | Full dashboard UI with sidebar + panels | Full-width hero mockups |

# AGENTS.md

## Core Rule

Understand → Plan → Implement → Verify → Review.

This is a frontend-only website. The existing codebase is the source of truth. Inspect existing components, layouts, styles, utilities, and patterns before modifying anything. Never guess when the repository can be inspected.

## Engineering

- Simple engineering over everything.
- Simple > clever.
- Reusable > duplicated.
- Explicit > over-abstracted.
- Reliable > prematurely optimized.
- Maximize reuse, reliability, maintainability, and efficiency.
- Match existing architecture and code patterns.
- Reuse existing components, utilities, hooks, and dependencies.
- Avoid unnecessary libraries, abstractions, rewrites, and refactors.
- Keep changes focused and proportional to the problem.

## UI / Design

- Follow the existing design system and visual language.
- Prioritize strong hierarchy, clean typography, generous whitespace, consistent spacing, and clear alignment.
- Keep the interface minimal, premium, technical, and intentional.
- Avoid visual clutter, excessive gradients, shadows, borders, decoration, and unnecessary animation.
- Use existing colors, typography, spacing, and component tokens.
- Maintain responsive behavior across desktop, tablet, and mobile.
- Use semantic HTML and accessible interactions.
- Animations should be subtle, purposeful, performant, and respect `prefers-reduced-motion`.

## Components

Build small, reusable, composable components.

Do not duplicate existing functionality or create abstractions for hypothetical use cases. Extend existing components when appropriate.

## Performance

Keep the frontend fast:
- Avoid unnecessary dependencies.
- Prefer simple browser/CSS solutions.
- Avoid unnecessary renders and JavaScript.
- Optimize large assets.
- Do not prematurely optimize without evidence.

## Verification

After changes, run relevant:
- Type checking
- Linting
- Build
- Tests
- Responsive/accessibility checks

Review the final diff and fix issues before finishing. If a check cannot be run, state that explicitly.

## Change Discipline

Do not modify unrelated files, reformat untouched code, or replace working architecture without a clear requirement.

The final implementation must be:

**Simple. Reusable. Reliable. Efficient. Accessible. Maintainable.**

## Design Reference

**Always refer to `DESIGN-apple.md` for the website's design direction, visual principles, and Apple-inspired UI decisions.**
/**
 * Muted body copy — the paragraph voice shared by section descriptions and card
 * bodies. Kept as one string so the places that use it cannot drift apart, and
 * so the size ladder lives in `t-body` rather than being restated per call site.
 */
export const BODY_MUTED_CLASS = "t-body text-muted text-sm sm:text-base font-normal leading-relaxed"

/**
 * Motion shared by the site's controls that change view.
 *
 * A segmented control and the console it previews both swap one pane for
 * another, and they have to do it the same way — same curve, same duration,
 * same order. Keeping the strings here means the two cannot drift into two
 * almost-identical animations.
 */

/** A selection sliding between positions: transform and width on one curve. */
export const SLIDE =
  "transition-[transform,width] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"

/** A counter-shifted twin of a sliding layer, on the identical curve. */
export const SLIDE_COUNTER =
  "transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"

/** Recolouring a label as the selection arrives at it. */
export const TINT = "transition-colors duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"

/**
 * Sequential fade for one layer of a stack — the outgoing layer clears before
 * the incoming one lands, so two views never ghost over each other. Pairs with
 * a `grid` parent, which is what stacks the layers in one cell.
 */
export const fadeLayerClass = (isActive: boolean) =>
  `col-start-1 row-start-1 w-full transition-opacity ease-[cubic-bezier(0.16,1,0.3,1)] ${
    isActive
      ? "duration-[350ms] delay-150 opacity-100"
      : "pointer-events-none opacity-0 duration-150"
  }`

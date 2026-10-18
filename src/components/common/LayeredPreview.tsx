import type { ReactNode } from "react"
import type { LayeredAsset } from "@/types"
import { withAssetHash } from "@/utils/helpers"

export interface LayeredPreviewProps extends Partial<LayeredAsset> {
  bgSrc: string
  fgSrc: string
  className?: string
  children?: ReactNode
}

/**
 * The box the console mockups occupy, at every breakpoint. Exported so a
 * stand-in can hold exactly the same space while the artwork is being made
 * instead of re-typing the geometry and letting the two drift apart.
 */
export const PREVIEW_MAX_WIDTH = "max-w-4xl lg:max-w-6xl"
export const PREVIEW_MOBILE_HEIGHT =
  "h-[450px] min-[375px]:h-[470px] min-[390px]:h-[500px] min-[430px]:h-[530px] sm:h-auto"

/**
 * The frame between the console and the edge of its panel.
 *
 * A percentage padding is the one inset CSS measures against the width on all
 * four sides, so this single number buys a frame of identical thickness top,
 * bottom and sides at every size. Sizing the console by width cannot: it is
 * 851x582 sitting in a 1039x676 panel, so the sides would always keep about
 * 2.5x the gap the top and bottom are left with.
 *
 * 6% leaves the console the 88% of the panel it was always meant to have, and
 * is the middle of the artwork's own frame — 47 units along the top and bottom,
 * 94 down the sides — now spent evenly instead of 2:1.
 *
 * Reading it back: the console fills whatever is left, so at a given panel
 * width this number and the console's size trade off one for one. Growing the
 * console without eating into the frame is `PREVIEW_MAX_WIDTH`'s job.
 *
 * Exported so the stand-in that reserves this space resizes with it.
 */
export const PREVIEW_FRAME_CLASS = "sm:p-[6%]"

/**
 * The gap the cropped console leaves at the panel's top, bottom and left edge
 * below `sm`, before the frame takes over as a padding around the console.
 *
 * Exported for the same reason as the frame: anything standing in for the
 * artwork crops itself the same way.
 */
export const PREVIEW_MOBILE_PADDING =
  "top-4 bottom-4 left-4 min-[375px]:top-5 min-[375px]:bottom-5 min-[375px]:left-5 min-[390px]:top-6 min-[390px]:bottom-6 min-[390px]:left-6 min-[430px]:top-7 min-[430px]:bottom-7 min-[430px]:left-7"

/**
 * A console mockup sitting in its environment artwork.
 *
 * From `sm` up the console is what decides the panel's height and the frame is
 * a padding around it, which is what keeps the frame even on all four sides.
 * Below `sm` the panel keeps a fixed height instead and the console is cropped
 * into it, anchored left.
 *
 * The panel carries its own radius and clip at every breakpoint. The artwork
 * does draw rounded corners, but `object-cover` scales it to the panel's
 * height, which pushes those corners off the sides — leaving the panel square.
 */
export function LayeredPreview({
  bgSrc,
  fgSrc,
  bgAlt = "Interactive environment background",
  fgAlt = "Interface console preview",
  bgWidth = 1039,
  bgHeight = 676,
  fgWidth = 851,
  fgHeight = 582,
  maxWidthClass = PREVIEW_MAX_WIDTH,
  mobileHeightClass = PREVIEW_MOBILE_HEIGHT,
  mobilePaddingClass = PREVIEW_MOBILE_PADDING,
  className = "",
  children,
}: Readonly<LayeredPreviewProps>) {
  return (
    <div
      className={`relative select-none w-full ${maxWidthClass} mx-auto overflow-hidden isolate rounded-[20px] squircle ${mobileHeightClass} border border-white/[0.08] sm:border-0 ${className}`.trim()}
    >
      <img
        src={withAssetHash(bgSrc)}
        alt={bgAlt}
        width={bgWidth}
        height={bgHeight}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center select-none pointer-events-none"
      />
      <div
        className={`absolute ${mobilePaddingClass} flex items-center justify-start w-auto pointer-events-none sm:relative sm:inset-auto sm:block sm:w-full ${PREVIEW_FRAME_CLASS}`}
      >
        <img
          src={withAssetHash(fgSrc)}
          alt={fgAlt}
          width={fgWidth}
          height={fgHeight}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-full w-auto max-w-none select-none pointer-events-none sm:h-auto sm:w-full"
        />
      </div>

      {children}
    </div>
  )
}
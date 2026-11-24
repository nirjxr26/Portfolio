import { useState, type ReactNode } from "react"
import type { LayeredAsset } from "@/types"
import { withAssetHash } from "@/lib/helpers"
import { BODY_MUTED_CLASS } from "./textStyles"

export interface LayeredPreviewProps extends Partial<LayeredAsset> {
  fgSrc: string
  frameClass?: string
  className?: string
  children?: ReactNode
}

/**
 * The box the console mockups occupy, at every breakpoint. Exported so a
 * stand-in can hold exactly the same space while the artwork is being made
 * instead of re-typing the geometry and letting the two drift apart.
 */
export const PREVIEW_MAX_WIDTH = "max-w-4xl lg:max-w-5xl"
export const PREVIEW_MOBILE_HEIGHT =
  "h-[440px] min-[375px]:h-[485px] min-[390px]:h-[515px] min-[430px]:h-[550px] sm:h-auto"

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
  "top-2.5 bottom-2.5 left-2.5 min-[375px]:top-3 min-[375px]:bottom-3 min-[375px]:left-3 min-[390px]:top-3.5 min-[390px]:bottom-3.5 min-[390px]:left-3.5 min-[430px]:top-3.5 min-[430px]:bottom-3.5 min-[430px]:left-3.5"

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
  fgSwatches,
  bgAlt = "Interactive environment background",
  fgAlt = "Interface console preview",
  bgWidth = 1039,
  bgHeight = 676,
  fgWidth = 851,
  fgHeight = 582,
  maxWidthClass = PREVIEW_MAX_WIDTH,
  fgMaxWidthClass = "",
  mobileHeightClass = PREVIEW_MOBILE_HEIGHT,
  mobilePaddingClass = PREVIEW_MOBILE_PADDING,
  mobileFgSrc,
  mobileFgWidth = 900,
  mobileFgHeight = 618,
  mobileFgClass = "h-full w-auto max-w-none",
  mobileFrameClass,
  frameClass,
  className = "",
  children,
}: Readonly<LayeredPreviewProps>) {
  const [activeFgSrc, setActiveFgSrc] = useState(fgSrc)
  const activeIndex = Math.max(
    0,
    fgSwatches?.findIndex((swatch) => swatch.svg === activeFgSrc) ?? 0,
  )
  const activeSwatch = fgSwatches?.[activeIndex]
  const frameWrapperClass = mobileFrameClass
    ? mobileFrameClass
    : `absolute ${mobilePaddingClass} flex items-center justify-start w-auto pointer-events-none sm:relative sm:inset-auto sm:block sm:w-full ${frameClass ?? PREVIEW_FRAME_CLASS}`
  const fgClass = `block ${mobileFgClass} select-none pointer-events-none sm:h-auto sm:w-full ${fgMaxWidthClass}`.trim()

  return (
    <>
      <div
        className={`relative select-none w-full ${maxWidthClass} mx-auto overflow-hidden isolate rounded-[20px] squircle ${mobileHeightClass} border border-white/[0.08] sm:border-0 ${className}`.trim()}
      >
        {bgSrc ? (
          <img
            src={withAssetHash(bgSrc)}
            alt={bgAlt}
            width={bgWidth}
            height={bgHeight}
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover object-center select-none pointer-events-none"
          />
        ) : (
          <span aria-hidden="true" className="absolute inset-0 bg-console-backdrop select-none pointer-events-none" />
        )}
        <div className={frameWrapperClass}>
          <img
            src={withAssetHash(activeFgSrc)}
            alt={fgAlt}
            width={fgWidth}
            height={fgHeight}
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            draggable={false}
            className={`${fgClass} ${mobileFgSrc ? "hidden sm:block" : ""}`.trim()}
          />
          {mobileFgSrc && (
            <img
              src={withAssetHash(mobileFgSrc)}
              alt={fgAlt}
              width={mobileFgWidth}
              height={mobileFgHeight}
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              draggable={false}
              className={`${fgClass} sm:hidden`.trim()}
            />
          )}
        </div>

        {children}
      </div>

      {fgSwatches && fgSwatches.length > 0 && (
        <div className="mt-4 sm:mt-6">
          <div className="flex justify-center" role="group" aria-label="Choose preview agent">
            <div className="relative inline-flex max-w-full items-center overflow-hidden rounded-full bg-surface-alt p-1">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-1 left-1 rounded-full bg-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none dark:bg-white"
                style={{
                  width: `calc((100% - 0.5rem) / ${fgSwatches.length})`,
                  transform: `translateX(${activeIndex * 100}%)`,
                }}
              />
              {fgSwatches.map((swatch) => (
                <button
                  key={swatch.svg}
                  type="button"
                  aria-pressed={activeFgSrc === swatch.svg}
                  onClick={() => setActiveFgSrc(swatch.svg)}
                  className={`relative z-10 w-24 cursor-pointer whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-500 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-32 ${
                    activeFgSrc === swatch.svg
                      ? "text-white dark:text-black"
                      : "text-muted dark:text-muted"
                  }`}
                >
                  {swatch.label}
                </button>
              ))}
            </div>
          </div>

          {activeSwatch && (
            <p
              key={activeFgSrc}
              className={`swatch-caption ${BODY_MUTED_CLASS} mx-auto mt-4 max-w-2xl px-4 text-center text-pretty`}
            >
              {activeSwatch.description}
            </p>
          )}
        </div>
      )}
    </>
  )
}

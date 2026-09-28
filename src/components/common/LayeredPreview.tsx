import type { ReactNode } from "react"
import type { LayeredAsset } from "@/types"

export interface LayeredPreviewProps extends Partial<LayeredAsset> {
  bgSrc: string
  fgSrc: string
  className?: string
  children?: ReactNode
}

export type TuiPreviewProps = LayeredPreviewProps

/**
 * Reusable layered spotlight preview showcasing a foreground console/UI graphic
 * elevated over a contextual workspace background canvas.
 */
export function LayeredPreview({
  bgSrc,
  fgSrc,
  bgAlt = "Interactive environment background",
  fgAlt = "Interface console preview",
  bgWidth = 1039,
  bgHeight = 676,
  fgWidth = 851,
  fgHeight = 586,
  fgWidthClass = "w-[82%]",
  maxWidthClass = "max-w-5xl lg:max-w-6xl xl:max-w-[1120px]",
  mobileHeightClass = "h-[460px] min-[390px]:h-[500px] min-[430px]:h-[540px] sm:h-auto",
  mobilePaddingClass = "top-5 bottom-5 left-5 min-[390px]:top-6 min-[390px]:bottom-6 min-[390px]:left-6",
  className = "",
  children,
}: Readonly<LayeredPreviewProps>) {
  return (
    <div
      className={`relative select-none w-full ${maxWidthClass} mx-auto overflow-hidden rounded-2xl sm:rounded-none sm:overflow-visible ${mobileHeightClass} border border-white/[0.08] sm:border-transparent ${className}`.trim()}
    >
      {/* Elevated Background Canvas */}
      <img
        src={bgSrc}
        alt={bgAlt}
        width={bgWidth}
        height={bgHeight}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center sm:static sm:h-auto sm:w-full select-none pointer-events-none"
      />

      {/* Main TUI Console: Equal padding on all visible sides of the outer bg SVG */}
      <div className={`absolute ${mobilePaddingClass} sm:inset-0 sm:top-0 sm:bottom-0 sm:left-0 flex items-center justify-start sm:justify-center w-auto sm:w-full pointer-events-none`}>
        <img
          src={fgSrc}
          alt={fgAlt}
          width={fgWidth}
          height={fgHeight}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`block h-full sm:h-auto w-auto ${fgWidthClass} max-w-none sm:max-w-full select-none pointer-events-none`.trim()}
        />
      </div>

      {children}
    </div>
  )
}

export const TuiPreview = LayeredPreview
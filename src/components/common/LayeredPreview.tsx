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
  className = "",
  children,
}: Readonly<LayeredPreviewProps>) {
  return (
    <div className={`relative w-full ${maxWidthClass} mx-auto select-none ${className}`.trim()}>
      {/* Elevated Background Canvas */}
      <img
        src={bgSrc}
        alt={bgAlt}
        width={bgWidth}
        height={bgHeight}
        className="w-full h-auto block select-none pointer-events-none"
        loading="lazy"
        decoding="async"
      />

      {/* Centered Layered Console / UI */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={fgSrc}
          alt={fgAlt}
          width={fgWidth}
          height={fgHeight}
          className={`${fgWidthClass} h-auto block select-none pointer-events-none`.trim()}
          loading="lazy"
          decoding="async"
        />
      </div>
      {children}
    </div>
  )
}

/**
 * Backwards-compatible alias for existing TUI-specific callers.
 */
export const TuiPreview = LayeredPreview

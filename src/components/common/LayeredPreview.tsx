import type { ReactNode } from "react"
import type { LayeredAsset } from "@/types"

export interface LayeredPreviewProps extends Partial<LayeredAsset> {
  bgSrc: string
  fgSrc: string
  className?: string
  children?: ReactNode
}

export function LayeredPreview({
  bgSrc,
  fgSrc,
  bgAlt = "Interactive environment background",
  fgAlt = "Interface console preview",
  bgWidth = 1039,
  bgHeight = 676,
  fgWidth = 851,
  fgHeight = 586,
  fgWidthClass = "w-[88%]",
  maxWidthClass = "max-w-4xl lg:max-w-5xl xl:max-w-[1020px]",
  mobileHeightClass = "h-[450px] min-[375px]:h-[470px] min-[390px]:h-[500px] min-[430px]:h-[530px] sm:h-auto",
  mobilePaddingClass = "top-6 bottom-6 left-6 min-[375px]:top-7 min-[375px]:bottom-7 min-[375px]:left-7 min-[390px]:top-8 min-[390px]:bottom-8 min-[390px]:left-8 min-[430px]:top-9 min-[430px]:bottom-9 min-[430px]:left-9",
  className = "",
  children,
}: Readonly<LayeredPreviewProps>) {
  return (
    <div
      className={`relative select-none w-full ${maxWidthClass} mx-auto overflow-hidden squircle sm:rounded-none sm:overflow-visible ${mobileHeightClass} border border-white/[0.08] sm:border-transparent ${className}`.trim()}
    >
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
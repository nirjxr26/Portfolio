import type { HeroAsset } from "@/types"

export interface HeroAssetPreviewProps {
  asset: HeroAsset
  className?: string
}

export function HeroAssetPreview({
  asset,
  className = "",
}: Readonly<HeroAssetPreviewProps>) {
  const maxWidth = asset.maxWidthClass ?? "max-w-4xl lg:max-w-5xl"

  return (
    <div
      className={`relative w-full ${maxWidth} mx-auto overflow-hidden aspect-[1808/793] aspect-hero-65 min-h-0 animate-device-rise ${className}`.trim()}
    >
      <img
        src={asset.src}
        alt={asset.alt ?? "Hero visual preview"}
        width={asset.width ?? 904}
        height={asset.height ?? 610}
        className="absolute top-0 left-0 w-full h-auto object-top select-none pointer-events-none block"
        loading="eager"
        decoding="async"
      />
    </div>
  )
}

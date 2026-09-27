import type { HeroAsset, InstallCommand } from "@/types"
import { InstallSnippet } from "./InstallSnippet"

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

/**
 * Reusable hero media component combining install snippet and device hero mockup
 * with responsive vertical rhythm and spacing.
 */
export function CaseStudyHeroMedia({
  installCommands,
  heroAsset,
}: Readonly<{
  installCommands?: InstallCommand[]
  heroAsset?: HeroAsset
}>) {
  const hasCommands = Boolean(installCommands && installCommands.length > 0)
  if (!hasCommands && !heroAsset) return null

  return (
    <>
      {installCommands && hasCommands && (
        <div className="hidden sm:flex justify-center w-full">
          <InstallSnippet commands={installCommands} />
        </div>
      )}
      {heroAsset && (
        <HeroAssetPreview
          asset={heroAsset}
          className={hasCommands ? "mt-0 sm:mt-10 md:mt-12" : "mt-2 sm:mt-4 md:mt-6"}
        />
      )}
    </>
  )
}

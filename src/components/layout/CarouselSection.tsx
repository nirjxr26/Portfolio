import type { ReactNode } from "react"
import type { LayeredAsset } from "@/types"
import { LayeredPreview } from "../common/LayeredPreview"
import { CarouselTrack } from "../common/CarouselTrack"
import { Container } from "./Container"
import { Section, SectionHeader } from "./Section"

interface CarouselSectionProps {
  id?: string
  tag?: ReactNode | string
  tagClassName?: string
  title: ReactNode | string
  titleClassName?: string
  desc?: ReactNode | string
  descClassName?: string
  media?: ReactNode
  layeredAsset?: LayeredAsset
  bgClass?: string
  padClass?: string
  headerClassName?: string
  trackWrapperClassName?: string
  trackCentered?: boolean
  centeredHeader?: boolean
  children?: ReactNode
}

export function CarouselSection({
  id,
  tag,
  tagClassName,
  title,
  titleClassName,
  desc,
  descClassName,
  media,
  layeredAsset,
  bgClass = "bg-canvas",
  padClass,
  headerClassName,
  trackWrapperClassName = "",
  trackCentered = false,
  centeredHeader = false,
  children,
}: Readonly<CarouselSectionProps>) {
  const hasChildren = Boolean(children && (!Array.isArray(children) || children.length > 0))
  const defaultHeaderClass = hasChildren ? "mb-6 sm:mb-8" : ""
  const headerClass = headerClassName ?? defaultHeaderClass
  const resolvedMedia = media ?? (layeredAsset ? <LayeredPreview {...layeredAsset} /> : null)

  // A mockup already carries its own generous margin, so the section's bottom
  // padding is on top of that. Stacking the full `py-14 sm:py-18` under a
  // painting leaves ~144px of dead air before whatever follows it; only the
  // bottom edge is tightened so the gap *above* the mockup is unchanged.
  const resolvedPadClass =
    padClass ?? (resolvedMedia ? "pt-14 sm:pt-18 pb-6 sm:pb-10" : undefined)

  return (
    <Section id={id} bgClass={bgClass} padClass={resolvedPadClass}>
      <SectionHeader
        tag={tag}
        tagClassName={tagClassName}
        title={title}
        titleClassName={titleClassName}
        desc={desc}
        descClassName={descClassName}
        className={headerClass}
        centered={centeredHeader}
      />

      {resolvedMedia && (
        <div className="reveal-on-scroll mt-8 sm:mt-10 md:mt-12 w-full">
          <Container className="flex justify-center">
            {resolvedMedia}
          </Container>
        </div>
      )}

      {hasChildren ? (
        <div className={`reveal-on-scroll ${trackWrapperClassName}`.trim()}>
          <CarouselTrack centered={trackCentered}>{children}</CarouselTrack>
        </div>
      ) : null}
    </Section>
  )
}


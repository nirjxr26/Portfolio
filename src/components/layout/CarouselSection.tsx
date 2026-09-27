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
  desc?: ReactNode | string
  descClassName?: string
  media?: ReactNode
  layeredAsset?: LayeredAsset
  bgClass?: string
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
  desc,
  descClassName,
  media,
  layeredAsset,
  bgClass = "bg-canvas",
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

  return (
    <Section id={id} bgClass={bgClass}>
      <SectionHeader
        tag={tag}
        tagClassName={tagClassName}
        title={title}
        desc={desc}
        descClassName={descClassName}
        className={headerClass}
        centered={centeredHeader}
      />

      {resolvedMedia && (
        <Container className="reveal-on-scroll mt-8 sm:mt-10 md:mt-12 flex justify-center">
          {resolvedMedia}
        </Container>
      )}

      {hasChildren ? (
        <div className={`reveal-on-scroll ${trackWrapperClassName}`.trim()}>
          <CarouselTrack centered={trackCentered}>{children}</CarouselTrack>
        </div>
      ) : null}
    </Section>
  )
}


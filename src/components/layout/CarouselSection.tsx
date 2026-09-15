import type { ReactNode } from "react"
import { CarouselTrack } from "../common/CarouselTrack"
import { Section, SectionHeader } from "./Section"

interface CarouselSectionProps {
  id?: string
  title: string
  bgClass?: string
  headerClassName?: string
  trackWrapperClassName?: string
  children: ReactNode
}

export function CarouselSection({
  id,
  title,
  bgClass = "bg-canvas",
  headerClassName = "mb-6 sm:mb-8",
  trackWrapperClassName = "",
  children,
}: Readonly<CarouselSectionProps>) {
  return (
    <Section id={id} bgClass={bgClass}>
      <SectionHeader title={title} className={headerClassName} />

      <div className={`reveal-on-scroll ${trackWrapperClassName}`.trim()}>
        <CarouselTrack>{children}</CarouselTrack>
      </div>
    </Section>
  )
}

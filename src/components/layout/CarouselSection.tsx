import type { ReactNode } from "react"
import { Container } from "./Container"
import { CarouselTrack } from "../common/CarouselTrack"

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
}: CarouselSectionProps) {
  return (
    <section id={id} className={`scroll-mt-12 overflow-hidden py-14 sm:py-18 ${bgClass}`}>
      <Container className={`reveal-on-scroll ${headerClassName}`}>
        <h2 className="t-display">{title}</h2>
      </Container>

      <div className={`reveal-on-scroll ${trackWrapperClassName}`}>
        <CarouselTrack>{children}</CarouselTrack>
      </div>
    </section>
  )
}

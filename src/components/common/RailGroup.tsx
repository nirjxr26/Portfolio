import type { ReactNode } from "react"
import { Container } from "../layout/Container"
import { CarouselTrack } from "./CarouselTrack"

export function RailGroup({
  id,
  title,
  spaced = true,
  children,
}: Readonly<{ id?: string; title: string; spaced?: boolean; children: ReactNode }>) {
  return (
    <div id={id} className={spaced ? "mt-12 sm:mt-16 w-full reveal-on-scroll scroll-mt-12" : "w-full reveal-on-scroll scroll-mt-12"}>
      <Container className="mb-6 sm:mb-8">
        <h3 className="t-caption-strong font-display text-ink tracking-normal text-lg min-[375px]:text-xl sm:text-2xl">
          {title}
        </h3>
      </Container>
      <CarouselTrack>{children}</CarouselTrack>
    </div>
  )
}

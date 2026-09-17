import type { ReactNode } from "react"
import { Container } from "../layout/Container"
import { CarouselTrack } from "./CarouselTrack"

export function RailGroup({
  title,
  spaced = true,
  children,
}: Readonly<{ title: string; spaced?: boolean; children: ReactNode }>) {
  return (
    <div className={spaced ? "mt-12 sm:mt-16 w-full reveal-on-scroll" : "w-full reveal-on-scroll"}>
      <Container className="mb-6 sm:mb-8">
        <h3 className="t-caption-strong text-ink tracking-normal text-lg min-[375px]:text-xl sm:text-2xl font-medium">
          {title}
        </h3>
      </Container>
      <CarouselTrack>{children}</CarouselTrack>
    </div>
  )
}

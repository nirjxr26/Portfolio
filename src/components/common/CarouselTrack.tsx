import { ReactNode } from "react"

export function CarouselTrack({ children, centered = false }: Readonly<{ children: ReactNode; centered?: boolean }>) {
  return (
    <div className="w-full">
      <div
        className={`carousel-track-container no-scrollbar flex snap-x snap-mandatory overflow-x-auto py-3 gap-4 min-[414px]:gap-5 sm:gap-6 ${centered ? "carousel-track-centered" : ""}`.trim()}
      >
        {children}
      </div>
    </div>
  )
}

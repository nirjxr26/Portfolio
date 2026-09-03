import { productionCapabilities } from "@/data/home"
import { CarouselSection } from "../layout/CarouselSection"
import { FeatureCard } from "./FeatureCard"

interface ProductionRailProps {
  bgClass?: string
  cardBgClass?: string
}

export function ProductionRail({
  bgClass = "bg-surface-alt",
  cardBgClass = "bg-card",
}: ProductionRailProps) {
  return (
    <CarouselSection id="bring-to-production" title="What I bring to production." bgClass={bgClass}>
      {productionCapabilities.map((cap) => (
        <FeatureCard
          key={cap.title}
          card={{
            headline: cap.tagline,
            body: cap.desc,
            tag: cap.title,
          }}
          cardBgClass={cardBgClass}
        />
      ))}
    </CarouselSection>
  )
}

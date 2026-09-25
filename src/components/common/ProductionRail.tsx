import { productionCapabilities } from "@/data/home"
import { CarouselSection } from "../layout/CarouselSection"
import { FeatureCard } from "./cards"

interface ProductionRailProps {
  id?: string
  title?: string
  bgClass?: string
  cardBgClass?: string
}

export function ProductionRail({
  id = "how-i-engineer",
  title = "How I think.",
  bgClass = "bg-surface-alt",
  cardBgClass = "bg-card",
}: Readonly<ProductionRailProps>) {
  return (
    <CarouselSection id={id} title={title} bgClass={bgClass}>
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

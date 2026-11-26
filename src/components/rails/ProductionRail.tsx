import { productionCapabilities } from "@/features/home/data/home"
import { HOW_I_WORK_CARDS } from "@/features/services/data/services"
import { CarouselSection } from "@/components/layout/CarouselSection"
import { Section, SectionHeader } from "@/components/layout/Section"
import { CarouselTrack } from "./CarouselTrack"
import { FeatureCard } from "@/components/ui/cards"
import type { CardItem } from "@/types"

interface FeatureRailProps {
  cards: CardItem[]
  cardBgClass?: string
}

export function FeatureRail({ cards, cardBgClass = "bg-card" }: Readonly<FeatureRailProps>) {
  return (
    <div className="reveal-on-scroll">
      <CarouselTrack>
        {cards.map((card) => (
          <FeatureCard
            key={`${card.tag ?? ""}-${card.headline}`}
            card={card}
            cardBgClass={cardBgClass}
          />
        ))}
      </CarouselTrack>
    </div>
  )
}

const THINK_CARDS: CardItem[] = productionCapabilities.map((cap) => ({
  headline: cap.tagline,
  body: cap.desc,
  tag: cap.title,
}))

const WORK_CARDS: CardItem[] = HOW_I_WORK_CARDS.map((card) => ({
  headline: card.title,
  body: card.desc,
  tag: card.tag,
}))

interface ThinkingAndWorkingSectionProps {
  id?: string
  bgClass?: string
  cardBgClass?: string
  padClass?: string
}

export function ThinkingAndWorkingSection({
  id = "how-i-think",
  bgClass = "bg-surface-alt",
  cardBgClass = "bg-card",
  padClass,
}: Readonly<ThinkingAndWorkingSectionProps>) {
  return (
    <Section id={id} bgClass={bgClass} padClass={padClass}>
      <SectionHeader title="How I think." />
      <FeatureRail cards={THINK_CARDS} cardBgClass={cardBgClass} />

      <div id="how-i-work" className="mt-12 sm:mt-16 scroll-mt-12">
        <SectionHeader title="How I work." />
        <FeatureRail cards={WORK_CARDS} cardBgClass={cardBgClass} />
      </div>
    </Section>
  )
}

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
      {THINK_CARDS.map((card) => (
        <FeatureCard
          key={card.tag ?? card.headline}
          card={card}
          cardBgClass={cardBgClass}
        />
      ))}
    </CarouselSection>
  )
}

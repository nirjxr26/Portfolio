import type { CardItem } from "@/types"
import { BaseCard, CARD_HEIGHT, CARD_PADDING, FEATURE_CARD_SIZE } from "../BaseCard"
import { CardEyebrow } from "./atoms"

export function FeatureCard({
  card,
  cardBgClass = "bg-card",
}: Readonly<{ card: CardItem; cardBgClass?: string }>) {
  return (
    <BaseCard
      as="article"
      className={`${FEATURE_CARD_SIZE} ${CARD_PADDING} md:p-9 ${CARD_HEIGHT} ${cardBgClass}`}
    >
      <div>
        {card.tag && <CardEyebrow tone="accent">{card.tag}</CardEyebrow>}
        <h3 className="t-tagline tracking-normal text-ink text-lg min-[375px]:text-xl sm:text-2xl leading-tight">
          {card.headline}
        </h3>
        {card.body && (
          <p className="t-body card-desc text-muted text-sm sm:text-base leading-relaxed">
            {card.body}
          </p>
        )}
      </div>
    </BaseCard>
  )
}

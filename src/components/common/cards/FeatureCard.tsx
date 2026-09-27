import type { CardItem } from "@/types"
import { BaseCard, CARD_HEIGHT, CARD_PADDING, FEATURE_CARD_SIZE, WIDE_CARD_SIZE } from "../BaseCard"
import { CardBody, CardEyebrow, CardHeadline } from "./atoms"

export function FeatureCard({
  card,
  cardBgClass = "bg-card",
  wide = false,
  centered = false,
}: Readonly<{ card: CardItem; cardBgClass?: string; wide?: boolean; centered?: boolean }>) {
  const sizeClass = wide || card.wide ? WIDE_CARD_SIZE : FEATURE_CARD_SIZE
  const isCentered = centered || card.centered

  return (
    <BaseCard
      as="article"
      className={`${sizeClass} ${CARD_PADDING} md:p-9 ${CARD_HEIGHT} ${cardBgClass}`}
    >
      <div className={isCentered ? "text-center flex flex-col items-center w-full" : ""}>
        {card.tag && <CardEyebrow tone="accent">{card.tag}</CardEyebrow>}
        <CardHeadline centered={isCentered}>{card.headline}</CardHeadline>
        {card.body && <CardBody>{card.body}</CardBody>}
      </div>
    </BaseCard>
  )
}

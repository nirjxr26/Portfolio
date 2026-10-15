import type { CardItem } from "@/types"
import { withAssetHash } from "@/utils/helpers"
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
  // A card carrying a preview grows to fit it instead of being clipped by the
  // shared rail height.
  const heightClass = card.image ? "" : CARD_HEIGHT

  return (
    <BaseCard
      as="article"
      className={`${sizeClass} ${CARD_PADDING} md:p-9 ${heightClass} ${cardBgClass}`}
    >
      <div className={isCentered ? "text-center flex flex-col items-center w-full" : ""}>
        {card.tag && <CardEyebrow tone="accent">{card.tag}</CardEyebrow>}
        <CardHeadline centered={isCentered}>{card.headline}</CardHeadline>
        {card.body && <CardBody>{card.body}</CardBody>}

        {card.image && (
          <img
            src={withAssetHash(card.image.src)}
            alt={card.image.alt ?? ""}
            width={card.image.width}
            height={card.image.height}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={`mt-6 block h-auto w-full max-w-full select-none pointer-events-none ${
              isCentered ? "mx-auto" : ""
            } ${card.image.maxWidthClass ?? ""}`}
          />
        )}
      </div>
    </BaseCard>
  )
}
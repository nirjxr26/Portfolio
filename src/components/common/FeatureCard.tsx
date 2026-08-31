interface FeatureCardItem {
  headline: string
  body?: string
  tag?: string
}

interface FeatureCardProps {
  card: FeatureCardItem
  cardBgClass?: string
  cardWidthClass?: string
  cardHeightClass?: string
  hideBody?: boolean
}

export function FeatureCard({
  card,
  cardBgClass = "bg-card",
  cardWidthClass = "w-[270px] min-[375px]:w-[300px] min-[480px]:w-[340px] min-[577px]:w-[360px] md:w-[380px] lg:w-[400px]",
  cardHeightClass = "h-[320px] sm:h-[350px] min-h-[320px] sm:min-h-[350px]",
  hideBody = false,
}: FeatureCardProps) {
  return (
    <article
      className={`${cardWidthClass} shrink-0 snap-start rounded-[20px] p-5 min-[375px]:p-6 sm:p-8 md:p-9 ${cardHeightClass} flex flex-col justify-between apple-card-hover ${cardBgClass}`}
    >
      <div>
        {card.tag && (
          <p className="t-caption-strong font-semibold tracking-wide text-accent text-xs min-[375px]:text-sm mb-3 sm:mb-4">
            {card.tag}
          </p>
        )}
        <h3 className="t-tagline text-ink text-lg min-[375px]:text-xl sm:text-2xl leading-tight">
          {card.headline}
        </h3>
        {!hideBody && card.body && (
          <p className="t-body mt-1.5 sm:mt-3 text-muted text-sm sm:text-base leading-relaxed">
            {card.body}
          </p>
        )}
      </div>
    </article>
  )
}

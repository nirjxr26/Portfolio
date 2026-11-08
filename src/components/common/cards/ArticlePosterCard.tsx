import { withAssetHash } from "@/utils/helpers"
import { articleAriaLabel, CardHeadline } from "./atoms"

interface ArticlePosterCardProps {
  article: {
    title: string
    slug?: string
    link?: string
    poster?: {
      light: string
      dark: string
    }
  }
  className?: string
}

export function ArticlePosterCard({
  article,
  className = "",
}: Readonly<ArticlePosterCardProps>) {
  if (!article.poster) return null

  const href = article.link ?? (article.slug ? `/articles/${article.slug}` : "#")

  return (
    <a
      href={href}
      aria-label={articleAriaLabel(article.title)}
      className={`group flex flex-col justify-start w-[300px] sm:w-[400px] focus-visible:outline-2 focus-visible:outline-accent rounded-[16px] ${className}`.trim()}
    >
      <div className="w-[300px] h-[320px] sm:w-[400px] sm:h-[350px] overflow-hidden rounded-[15px] sm:rounded-[18px] transition-transform duration-300 ease-out group-hover:scale-[1.015] group-active:scale-[0.98]">
        <img
          src={withAssetHash(article.poster.light)}
          alt=""
          width={400}
          height={350}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="w-full h-full object-cover dark:hidden select-none pointer-events-none"
        />
        <img
          src={withAssetHash(article.poster.dark)}
          alt=""
          width={400}
          height={350}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="w-full h-full object-cover hidden dark:block select-none pointer-events-none"
        />
      </div>

      <div className="mt-5 sm:mt-6 w-[300px] sm:w-[400px]">
        <CardHeadline>
          {article.title}
        </CardHeadline>
      </div>
    </a>
  )
}

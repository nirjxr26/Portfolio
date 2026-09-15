import { useEffect, useMemo, useState } from "react"
import { BaseCard, ShareButton } from "../common"
import { CheckIcon, ClockIcon, CopyIcon, LinkIcon, MailIcon, WhatsAppIcon, XIcon } from "../common/Icons"
import { Seo } from "../common"
import { PageShell } from "../layout"
import { useCopy } from "@/utils/useCopy"
import { renderContent, slugify } from "@/utils/markdown"
import { buildTechArticleSchema, estimateWordCount, toISODate } from "@/data/seo"
import { BLOG_ARTICLES, type BlogArticle } from "@/data/blogArticles"
import { articles as HOME_ARTICLES } from "@/data/home"

function ArticleMoreCard({ article }: Readonly<{ article: BlogArticle }>) {
  const href = `/articles/${article.slug}`
  // Use same short desc as /articles bento cards (home.ts) for visual parity — fallback to blog description
  const homeMatch = HOME_ARTICLES.find((h) => h.title === article.title || h.link.endsWith(article.slug))
  const shortDesc = homeMatch?.desc ?? article.description
  return (
    <BaseCard
      as="a"
      href={href}
      aria-label={`Read article: ${article.title}`}
      className="group h-[320px] min-h-[320px] bg-card p-5 min-[375px]:p-6 sm:h-[350px] sm:min-h-[350px] sm:p-8"
    >
      <div>
        <h3 className="t-tagline tracking-normal text-ink line-clamp-3">{article.title}</h3>
        <p className="t-body mt-3 line-clamp-3 text-muted">{shortDesc}</p>
      </div>
      <div className="mt-6 flex items-center gap-1.5">
        <ClockIcon width={12} height={12} className="shrink-0 text-muted" />
        <span className="t-fine text-muted">{article.readTime}</span>
      </div>
    </BaseCard>
  )
}

export function ArticleDetailLayout({ article }: Readonly<{ article: BlogArticle }>) {
  const { copied: copiedText, copy: copyText } = useCopy()
  const { copied: copiedLink, copy: copyLink } = useCopy()
  const canonical = `https://nirjar.me/articles/${article.slug}`
  const shareUrl = typeof window !== "undefined" ? window.location.href : canonical
  const shareTitle = article.title
  const isoDate = toISODate(article.updated)

  const articleSchema = useMemo(() => {
    const bodyText = article.sections.map((s) => `${s.subtitle} ${s.content}`).join(" ")
    return buildTechArticleSchema({
      title: article.title,
      description: article.description,
      canonical,
      category: article.category,
      keywords: `${article.category}, ${article.title}`,
      datePublished: isoDate,
      dateModified: isoDate,
      wordCount: estimateWordCount(`${article.description} ${bodyText}`),
      readTime: article.readTime,
    })
  }, [article, canonical, isoDate])

  const [moreArticles, setMoreArticles] = useState(() => BLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2))

  useEffect(() => {
    const others = [...BLOG_ARTICLES.filter((a) => a.slug !== article.slug)]
    for (let i = others.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[others[i], others[j]] = [others[j]!, others[i]!]
    }
    setMoreArticles(others.slice(0, 2))
  }, [article.slug])

  const handleCopyText = () => {
    const fullText = `${article.title}\n\n${article.description}\n\n${article.sections.map((s) => `${s.subtitle}\n${s.content}`).join("\n\n")}`
    void copyText(fullText)
  }

  const handleCopyLink = () => {
    void copyLink(shareUrl)
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
  const mailHref = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl })
      } catch {
        handleCopyLink()
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <PageShell
      headerPath="/articles"
      footerBgClass="bg-canvas"
      seo={
        <Seo
          title={`${article.title} | Nirjar Goswami`}
          description={article.description}
          canonicalUrl={canonical}
          ogType="article"
          publishedTime={isoDate}
          modifiedTime={isoDate}
          includeDefaultSchemas={false}
          articleSchema={articleSchema}
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Articles", url: "/articles" },
            { name: article.title, url: `/articles/${article.slug}` },
          ]}
        />
      }
    >
        <section className="bg-canvas pt-28 pb-8 sm:pt-36 sm:pb-10">
          <div className="mx-auto w-full max-w-[760px] px-4 text-center min-[414px]:px-6 sm:px-8">
            <h1 className="t-display mt-3 font-bold tracking-normal text-ink">{article.title}</h1>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 t-fine text-muted">
              <span>{article.updated}</span>
              <span aria-hidden="true">•</span>
              <span>{article.readTime} read</span>
            </div>
          </div>
        </section>

        <article className="bg-canvas pb-8 sm:pb-12">
          <div className="mx-auto w-full max-w-[720px] px-4 min-[414px]:px-6 sm:px-6 xl:max-w-[760px]">
            <hr className="border-hairline" />
            <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-12">
              {article.sections.map((section, idx) => {
                const id = slugify(section.subtitle)
                const isLast = idx === article.sections.length - 1
                return (
                  <div key={id}>
                    <section id={id} className="scroll-mt-28 reveal-on-scroll">
                      <h2 className="t-section-title tracking-normal text-ink">{section.subtitle}</h2>
                      <div className="mt-6 space-y-5 t-body leading-relaxed text-muted sm:text-[16px]">
                        {renderContent(section.content)}
                      </div>
                    </section>
                    {!isLast && <hr className="mt-10 border-hairline sm:mt-12" />}
                  </div>
                )
              })}
            </div>

            <div className="mt-12 flex flex-col gap-6 border-t border-hairline pt-8 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleCopyText}
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-alt px-4 py-2 t-fine text-ink transition-colors hover:bg-card"
              >
                {copiedText ? <CheckIcon width={14} height={14} className="text-accent" /> : <CopyIcon width={14} height={14} />}
                <span>{copiedText ? "Copied!" : "Copy Article"}</span>
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <span className="t-fine text-muted">Share this article</span>
                <div className="flex items-center gap-2">
                  <ShareButton label="Share on WhatsApp" href={whatsappHref}>
                    <WhatsAppIcon width={16} height={16} />
                  </ShareButton>
                  <ShareButton label="Share on X" href={xHref}>
                    <XIcon width={14} height={14} />
                  </ShareButton>
                  <ShareButton label="Share via mail" href={mailHref}>
                    <MailIcon width={16} height={16} />
                  </ShareButton>
                  <ShareButton label="Copy link or share" onClick={handleShare}>
                    {copiedLink ? <CheckIcon width={14} height={14} className="text-accent" /> : <LinkIcon width={16} height={16} />}
                  </ShareButton>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="bg-surface-alt py-14 sm:py-18">
          <div className="mx-auto w-full max-w-[980px] px-4 min-[414px]:px-6 sm:px-8 lg:px-0">
            <h2 className="t-display tracking-normal text-ink reveal-on-scroll">Other Articles.</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 min-[414px]:gap-5 sm:grid-cols-2 sm:gap-6 reveal-on-scroll">
              {moreArticles.map((a) => (
                <ArticleMoreCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
    </PageShell>
  )
}

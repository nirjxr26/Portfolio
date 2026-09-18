import { useMemo } from "react"
import { ArticleMoreCard, ShareButton, Seo } from "../common"
import { CheckIcon, CopySwapIcon, LinkIcon, MailIcon, WhatsAppIcon, XIcon } from "../common/Icons"
import { CarouselSection, PageShell } from "../layout"
import { useCopy } from "@/utils/useCopy"
import { renderContent, slugify } from "@/utils/markdown"
import { buildTechArticleSchema, estimateWordCount, toISODate } from "@/data/seo"
import { getAdjacentArticles, type BlogArticle } from "@/data/blogArticles"
import { SITE_URL } from "@/data/site"

export function ArticleDetailLayout({ article }: Readonly<{ article: BlogArticle }>) {
  const { copied: copiedText, copy: copyText } = useCopy()
  const { copied: copiedLink, copy: copyLink } = useCopy()
  const canonical = `${SITE_URL}/articles/${article.slug}`
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

  const neighbors = useMemo(() => {
    const { previous, next } = getAdjacentArticles(article.slug)
    const pairs: { blog: BlogArticle; eyebrow: string }[] = []
    if (previous) pairs.push({ blog: previous, eyebrow: "← Previous" })
    if (next) pairs.push({ blog: next, eyebrow: "Next →" })
    return pairs
  }, [article.slug])

  const handleCopyText = () => {
    const sectionsText = article.sections.map((section) => section.subtitle + "\n" + section.content).join("\n\n")
    const fullText = [article.title, article.description, sectionsText].join("\n\n")
    void copyText(fullText)
  }

  const handleCopyLink = () => {
    void copyLink(shareUrl)
  }

  const whatsappShareText = `${shareTitle} ${shareUrl}`
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(whatsappShareText)}`
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
  const mailHref = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
  const shareLinks = [
    { label: "Share on WhatsApp", href: whatsappHref, Icon: WhatsAppIcon, width: 16, height: 16 },
    { label: "Share on X", href: xHref, Icon: XIcon, width: 14, height: 14 },
    { label: "Share via mail", href: mailHref, Icon: MailIcon, width: 16, height: 16 },
  ]

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
                      <h2 className="t-section-title tracking-normal text-ink group flex items-center gap-2">
                        <span>{section.subtitle}</span>
                        <a
                          href={`#${id}`}
                          aria-label={`Link to section: ${section.subtitle}`}
                          className="text-[0.8em] font-normal text-muted no-underline opacity-0 transition-opacity hover:text-accent focus-visible:opacity-100 group-hover:opacity-100"
                        >
                          #
                        </a>
                      </h2>
                      <div className="mt-6 space-y-5 t-body leading-relaxed text-muted sm:text-[16px]">
                        {renderContent(section.content)}
                      </div>
                    </section>
                    {!isLast && <hr className="mt-10 border-hairline sm:mt-12" />}
                  </div>
                )
              })}
            </div>

            <div className="mt-12 flex flex-row flex-wrap items-center justify-between gap-6 border-t border-hairline pt-8 sm:mt-14">
              <button
                type="button"
                onClick={handleCopyText}
                className="btn-sm cursor-pointer border-0"
              >
                <CopySwapIcon copied={copiedText} width={14} height={14} />
                <span>{copiedText ? "Copied!" : "Copy Article"}</span>
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <span className="t-fine text-muted">Share this article</span>
                <div className="flex items-center gap-2">
                  {shareLinks.map((s) => (
                    <ShareButton key={s.label} label={s.label} href={s.href}>
                      <s.Icon width={s.width} height={s.height} />
                    </ShareButton>
                  ))}
                  <ShareButton label="Copy link or share" onClick={handleShare}>
                    {copiedLink ? <CheckIcon width={14} height={14} className="text-accent" /> : <LinkIcon width={16} height={16} />}
                  </ShareButton>
                </div>
              </div>
            </div>
          </div>
        </article>

        <CarouselSection
          id="keep-reading"
          title="Keep reading."
          bgClass="bg-surface-alt"
          headerClassName="mb-6 sm:mb-8 text-center"
          trackCentered
        >
          {neighbors.map(({ blog, eyebrow }) => (
            <ArticleMoreCard key={blog.slug} article={blog} eyebrow={eyebrow} />
          ))}
        </CarouselSection>
    </PageShell>
  )
}

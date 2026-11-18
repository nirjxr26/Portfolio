import { useMemo } from "react"
import { ArticleMoreCard, ShareButton, Seo } from "../common"
import { CheckIcon, CopySwapIcon, LinkIcon, MailIcon, WhatsAppIcon, XIcon } from "../common/Icons"
import { CarouselSection, PageShell } from "../layout"
import { useCopy } from "@/utils/useCopy"
import { renderContent, renderInline, slugify } from "@/utils/markdown"
import { absoluteUrl, buildTechArticleSchema, estimateWordCount, toISODate } from "@/data/seo"
import { getAdjacentArticles, type BlogArticle } from "@/data/blogArticles"
import { SITE_OG_IMAGE, SITE_URL } from "@/data/site"
import { createBreadcrumbs, withAssetHash } from "@/utils/helpers"

function renderArticleTitle(article: BlogArticle) {
  const raw = article.displayTitle ?? article.title
  if (!/<br\s*\/?>/i.test(raw)) {
    return raw
  }

  const parts = raw.split(/<br\s*\/?>/i)
  return (
    <>
      {parts.map((part, index) => {
        const cleanPart = part.trim()
        return (
          <span key={index}>
            {index > 0 && (
              <>
                <span className="hidden sm:inline"> </span>
                <br className="sm:hidden" />
              </>
            )}
            {cleanPart}
          </span>
        )
      })}
    </>
  )
}

export function ArticleDetailLayout({ article }: Readonly<{ article: BlogArticle }>) {
  const { copied: copiedText, copy: copyText } = useCopy()
  const { copied: copiedLink, copy: copyLink } = useCopy()
  const canonical = `${SITE_URL}/articles/${article.slug}`
  const shareUrl = typeof window !== "undefined" ? window.location.href : canonical
  const shareTitle = article.title
  const isoDate = toISODate(article.updated)

  const posterSrc = article.poster?.dark ?? article.poster?.light
  const articleImage = posterSrc
    ? absoluteUrl(posterSrc)
    : article.leadImage
    ? absoluteUrl(article.leadImage.src)
    : undefined

  const articleSchema = useMemo(() => {
    const bodyText = article.sections.map((s) => `${s.subtitle} ${s.content}`).join(" ")
    return buildTechArticleSchema({
      title: article.title,
      description: article.description,
      canonical,
      category: article.category,
      keywords: article.keywords,
      datePublished: isoDate,
      dateModified: isoDate,
      wordCount: estimateWordCount(`${bodyText} ${article.description}`),
      readTime: article.readTime,
      image: articleImage,
    })
  }, [article, articleImage, canonical, isoDate])

  const neighbors = useMemo(() => {
    const { previous, next } = getAdjacentArticles(article.slug)
    const list: BlogArticle[] = []
    if (previous) list.push(previous)
    if (next) list.push(next)
    return list
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
          ogImage={articleImage ?? SITE_OG_IMAGE}
          ogType="article"
          keywords={article.keywords}
          publishedTime={isoDate}
          modifiedTime={isoDate}
          includeDefaultSchemas={false}
          articleSchema={articleSchema}
          breadcrumbs={createBreadcrumbs([
            { name: "Articles", url: "/articles" },
            { name: article.title, url: `/articles/${article.slug}` },
          ])}
        />
      }
    >
        <article className="relative bg-canvas pt-28 pb-8 sm:pt-36 sm:pb-12">
          <header className="mx-auto w-full max-w-[720px] px-4 text-left min-[414px]:px-6 sm:px-6 xl:max-w-[760px]">
            <time dateTime={isoDate} className="block pb-2 sm:pb-3 text-[13px] sm:text-[14px] font-medium text-muted">
              {article.updated}
            </time>
            <h1 className="t-display text-[32px] sm:text-[clamp(30px,3.6vw,40px)] mt-2 sm:mt-2.5 font-bold tracking-normal text-ink text-left leading-[1.2]">{renderArticleTitle(article)}</h1>
            {article.subhead ? (
              <p className="pt-3.5 sm:pt-4 md:pt-5 text-[20px] sm:text-[21px] font-normal leading-snug text-ink text-pretty text-left">
                {renderInline(article.subhead, "article-subhead")}
              </p>
            ) : null}
            {!article.leadImage ? <hr className="mt-5 border-hairline sm:mt-6" /> : null}
          </header>

          {article.leadImage ? (
            <div className="mx-auto mt-6 w-full max-w-[1040px] px-4 min-[414px]:px-6 sm:mt-8 sm:px-8">
              <div className="aspect-[2/1] overflow-hidden rounded-[20px] squircle">
                <img
                  src={withAssetHash(article.leadImage.src)}
                  alt={article.leadImage.alt}
                  width={article.leadImage.width}
                  height={article.leadImage.height}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="block h-full w-full select-none object-cover object-center"
                />
              </div>
            </div>
          ) : null}
          <div className="mx-auto w-full max-w-[720px] px-4 min-[414px]:px-6 sm:px-6 xl:max-w-[760px]">
            <div className={`${article.leadImage ? "mt-8 sm:mt-10" : "mt-6 sm:mt-8"} space-y-10 sm:space-y-12`}>
              {article.sections.map((section, idx) => {
                const id = slugify(section.subtitle) || `section-${idx + 1}`
                const isLast = idx === article.sections.length - 1
                return (
                  <div key={id}>
                    <section id={id} className="scroll-mt-28">
                      {section.subtitle ? (
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
                      ) : null}
                      <div className={`${section.subtitle ? "mt-6" : ""} space-y-4 t-body text-[17px] leading-relaxed text-muted`}>
                        {renderContent(section.content)}
                      </div>
                    </section>
                    {!isLast && <hr className="mt-10 border-hairline sm:mt-12" />}
                  </div>
                )
              })}
              {article.disclaimer ? (
                <aside
                  aria-label="Disclaimer"
                  className="border-t border-hairline pt-6 text-[13px] leading-relaxed text-ink sm:text-sm"
                >
                  <p className="font-semibold">Disclaimer</p>
                  <p className="mt-2">{article.disclaimer}</p>
                </aside>
              ) : null}
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
          {neighbors.map((blog) => (
            <ArticleMoreCard key={blog.slug} article={blog} />
          ))}
        </CarouselSection>
    </PageShell>
  )
}

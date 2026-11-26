import { useState, useMemo } from "react"
import { ArticleMoreCard, Seo, AppleShareSheet } from "@/components"
import { CopySwapIcon, ShareIcon } from "@/components/ui/Icons"
import { CarouselSection, PageShell } from "@/components/layout"
import { useCopy } from "@/hooks/useCopy"
import {
  extractCompiledSectionText,
  renderCompiledNode,
  renderInline,
  slugify,
  type CompiledSection,
} from "@/lib/compiledMarkdown"
import { absoluteUrl, buildTechArticleSchema, estimateWordCount, toISODate } from "@/app/seo/seo"
import { getAdjacentArticleMeta, type ArticleMeta } from "@/features/articles/data/articleMeta"
import { SITE_OG_IMAGE, SITE_URL } from "@/app/seo/site"
import { createBreadcrumbs, withAssetHash } from "@/lib/helpers"

function renderArticleTitle(article: ArticleMeta) {
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

export function ArticleDetailPage({
  article,
  compiledSections,
}: Readonly<{ article: ArticleMeta; compiledSections: CompiledSection[] }>) {
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false)
  const { copied: copiedText, copy: copyText } = useCopy()
  const canonical = `${SITE_URL}/articles/${article.slug}`
  const shareUrl = typeof window !== "undefined" ? window.location.href : canonical
  const isoDate = toISODate(article.updated)

  const posterSrc = article.poster?.dark ?? article.poster?.light
  const articleImage = article.ogImage
    ? absoluteUrl(article.ogImage)
    : posterSrc
    ? absoluteUrl(posterSrc)
    : article.leadImage
    ? absoluteUrl(article.leadImage.src)
    : undefined

  const plainSectionsText = useMemo(
    () => compiledSections.map(extractCompiledSectionText).join("\n\n"),
    [compiledSections],
  )

  const articleSchema = useMemo(() => {
    return buildTechArticleSchema({
      title: article.title,
      description: article.description,
      canonical,
      category: article.category,
      keywords: article.keywords,
      datePublished: isoDate,
      dateModified: isoDate,
      wordCount: estimateWordCount(`${plainSectionsText} ${article.description}`),
      readTime: article.readTime,
      image: articleImage,
    })
  }, [article, articleImage, canonical, isoDate, plainSectionsText])

  const neighbors = useMemo(() => {
    const { previous, next } = getAdjacentArticleMeta(article.slug)
    const list: ArticleMeta[] = []
    if (previous) list.push(previous)
    if (next) list.push(next)
    return list
  }, [article.slug])

  const handleCopyText = () => {
    const fullText = [article.title, article.description, plainSectionsText].join("\n\n")
    void copyText(fullText)
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
            {article.projectCallout ? (
              <aside
                aria-label={article.projectCallout.name}
                className="mt-5 sm:mt-6 rounded-xl bg-surface-alt px-5 py-4 sm:px-6 sm:py-5 text-left"
              >
                {article.projectCallout.label ? (
                  <p className="text-[13px] font-medium text-muted">
                    {article.projectCallout.label}
                  </p>
                ) : null}
                <a
                  href={article.projectCallout.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[18px] sm:text-[19px] font-semibold text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                >
                  {article.projectCallout.name}
                </a>
                <p className="mt-2 text-[15px] sm:text-[16px] leading-relaxed text-ink">
                  {article.projectCallout.description}
                </p>
              </aside>
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
              {compiledSections.map((section, idx) => {
                const id = slugify(section.subtitle) || `section-${idx + 1}`
                const isLast = idx === compiledSections.length - 1
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
                      <div className={`${section.subtitle ? "mt-6" : ""} space-y-4 t-body text-[15px] sm:text-[17px] leading-relaxed text-ink`}>
                        {section.blocks.map((node, nodeIdx) =>
                          renderCompiledNode(node, `${id}-n${nodeIdx}`),
                        )}
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

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsShareSheetOpen(true)
                }}
                className="btn-sm cursor-pointer border-0 flex items-center gap-2"
              >
                <ShareIcon width={14} height={14} />
                <span>Share article</span>
              </button>
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

        <AppleShareSheet
          isOpen={isShareSheetOpen}
          onClose={() => setIsShareSheetOpen(false)}
          title={article.title}
          url={shareUrl}
          description={article.description}
          image={posterSrc ?? article.leadImage?.src}
          slug={article.slug}
        />
    </PageShell>
  )
}

import { lazy, Suspense, type ComponentType } from "react"
import { HomePage } from "@/pages/HomePage"
import { WorksPage } from "@/pages/WorksPage"
import { ServicesPage } from "@/pages/ServicesPage"
import { ArticlesPage } from "@/pages/ArticlesPage"
import { SitemapPage } from "@/pages/SitemapPage"
import { LegalPage } from "@/pages/LegalPage"
import { ErrorPage } from "@/pages/ErrorPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { CaseStudyPage } from "@/pages/CaseStudyPage"
import { CASE_STUDIES } from "@/features/case-studies/data/caseStudies"
import { cleanPath, resolveRoute } from "@/app/router/routes"
import { useInternalRouter } from "@/app/router/useInternalRouter"
import { getArticleMeta } from "@/features/articles/data/articleMeta"

function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    try {
      return await factory()
    } catch {
      if (typeof window !== "undefined") {
        window.location.reload()
      }
      return { default: (() => null) as unknown as T }
    }
  })
}

const compiledArticleLoaders = import.meta.glob<{ default: import("@/lib/compiledMarkdown").CompiledArticle }>(
  "../features/articles/data/compiled/*.json",
)

const articleRouteCache = new Map<string, ReturnType<typeof lazy>>()

function getArticleRoute(slug: string) {
  let cached = articleRouteCache.get(slug)
  if (!cached) {
    cached = lazyWithRetry(async () => {
      const loader = compiledArticleLoaders[`../features/articles/data/compiled/${slug}.json`]
      const [{ ArticleDetailPage }, compiledMod] = await Promise.all([
        import("@/pages/ArticleDetailPage"),
        loader ? loader() : Promise.resolve(null),
      ])
      const article = getArticleMeta(slug)
      const compiled = compiledMod?.default
      return {
        default: function ArticleRoute() {
          return article && compiled ? (
            <ArticleDetailPage article={article} compiledSections={compiled.sections} />
          ) : (
            <NotFoundPage />
          )
        },
      }
    })
    articleRouteCache.set(slug, cached)
  }
  return cached
}

function ArticleDetailRoute({ slug }: Readonly<{ slug: string }>) {
  const RouteComponent = getArticleRoute(slug)
  return <RouteComponent />
}

function CaseStudyRoute({ slug }: Readonly<{ slug: string }>) {
  const data = CASE_STUDIES[slug]
  return data ? <CaseStudyPage slug={slug} data={data} /> : <NotFoundPage />
}

export function App() {
  const pathname = useInternalRouter()
  const route = resolveRoute(pathname)

  let content = <NotFoundPage />
  if (route.kind === "home") {
    content = <HomePage />
  } else if (route.kind === "works") {
    content = <WorksPage />
  } else if (route.kind === "services") {
    content = <ServicesPage />
  } else if (route.kind === "articles") {
    content = <ArticlesPage />
  } else if (route.kind === "sitemap") {
    content = <SitemapPage />
  } else if (route.kind === "legal") {
    content = <LegalPage />
  } else if (route.kind === "error") {
    content = <ErrorPage />
  } else if (route.kind === "article-detail" && route.articleSlug) {
    content = <ArticleDetailRoute slug={route.articleSlug} />
  } else if (route.kind === "case-study" && route.caseSlug) {
    content = <CaseStudyRoute slug={route.caseSlug} />
  }

  return (
    <Suspense fallback={null}>
      <div key={cleanPath(pathname)}>{content}</div>
    </Suspense>
  )
}

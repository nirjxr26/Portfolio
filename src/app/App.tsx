import { lazy, Suspense, useDeferredValue } from "react"
import { HomePage } from "@/pages/HomePage"
import { cleanPath, resolveRoute } from "@/app/router/routes"
import { useInternalRouter } from "@/app/router/useInternalRouter"

const WorksPage = lazy(() => import("@/pages/WorksPage").then((m) => ({ default: m.WorksPage })))
const ServicesPage = lazy(() => import("@/pages/ServicesPage").then((m) => ({ default: m.ServicesPage })))
const ArticlesPage = lazy(() => import("@/pages/ArticlesPage").then((m) => ({ default: m.ArticlesPage })))
const SitemapPage = lazy(() => import("@/pages/SitemapPage").then((m) => ({ default: m.SitemapPage })))
const LegalPage = lazy(() => import("@/pages/LegalPage").then((m) => ({ default: m.LegalPage })))
const ErrorPage = lazy(() => import("@/pages/ErrorPage").then((m) => ({ default: m.ErrorPage })))
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })))

const ArticleDetailRoute = lazy(async () => {
  const [{ ArticleDetailPage }, { getBlogArticle }] = await Promise.all([
    import("@/pages/ArticleDetailPage"),
    import("@/features/articles/data/blogArticles"),
  ])
  return {
    default: function ArticleRoute({ slug }: Readonly<{ slug: string }>) {
      const article = getBlogArticle(slug)
      return article ? <ArticleDetailPage article={article} /> : <NotFoundPage />
    },
  }
})

const CaseStudyRoute = lazy(async () => {
  const [{ CaseStudyPage }, { CASE_STUDIES }] = await Promise.all([
    import("@/pages/CaseStudyPage"),
    import("@/features/case-studies/data/caseStudies"),
  ])
  return {
    default: function CaseRoute({ slug }: Readonly<{ slug: string }>) {
      const data = CASE_STUDIES[slug]
      return data ? <CaseStudyPage slug={slug} data={data} /> : <NotFoundPage />
    },
  }
})

export function App() {
  const pathname = useInternalRouter()
  const activePath = useDeferredValue(pathname)
  const route = resolveRoute(activePath)

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
      <div key={cleanPath(activePath)}>{content}</div>
    </Suspense>
  )
}

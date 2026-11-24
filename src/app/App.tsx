import {
  ArticleDetailPage,
  ArticlesPage,
  CaseStudyPage,
  ErrorPage,
  HomePage,
  LegalPage,
  NotFoundPage,
  ServicesPage,
  SitemapPage,
  WorksPage,
} from "@/pages"
import { getBlogArticle } from "@/features/articles/data/blogArticles"
import { CASE_STUDIES } from "@/features/case-studies/data/caseStudies"
import { cleanPath, resolveRoute } from "@/app/router/routes"
import { useInternalRouter } from "@/app/router/useInternalRouter"

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
    const article = getBlogArticle(route.articleSlug)
    if (article) {
      content = <ArticleDetailPage article={article} />
    }
  } else if (route.kind === "case-study" && route.caseSlug) {
    const data = CASE_STUDIES[route.caseSlug]
    if (data) {
      content = <CaseStudyPage slug={route.caseSlug} data={data} />
    }
  }

  return (
    <div key={cleanPath(pathname)} className="page-transition">
      {content}
    </div>
  )
}

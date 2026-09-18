import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import {
  ArticleClient,
  ArticleDetailLayout,
  CaseStudyPage,
  ErrorBoundary,
  HomeClient,
  NotFoundClient,
  WorksClient,
} from "@/components"
import { getBlogArticle } from "@/data/blogArticles"
import { CASE_STUDIES } from "@/data/caseStudies"
import { cleanPath, resolveRoute } from "@/data/routes"
import { useInternalRouter } from "@/utils/useInternalRouter"

// Theme & scroll initialization
if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual"
  }
  window.scrollTo(0, 0)
}

function App() {
  const pathname = useInternalRouter()
  const route = resolveRoute(pathname)

  let content = <NotFoundClient />
  if (route.kind === "home") {
    content = <HomeClient />
  } else if (route.kind === "works") {
    content = <WorksClient />
  } else if (route.kind === "articles") {
    content = <ArticleClient />
  } else if (route.kind === "article-detail" && route.articleSlug) {
    const article = getBlogArticle(route.articleSlug)
    if (article) {
      content = <ArticleDetailLayout article={article} />
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

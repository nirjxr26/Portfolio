import { describe, expect, it } from "vitest"
import statusHandler, { buildStatus } from "./status"
import projectsHandler, { PORTFOLIO_PROJECTS } from "./projects"

describe("Edge status API (/api/status)", () => {
  it("returns clean status without leaking commit, version, or CORS wildcard", async () => {
    const fakeReq = new Request("https://nirjar.me/api/status", {
      headers: {
        "x-vercel-id": "iad1::12345",
      },
    })

    const res = statusHandler(fakeReq)
    expect(res.status).toBe(200)
    expect(res.headers.get("Content-Type")).toBe("application/json; charset=utf-8")
    expect(res.headers.get("Cache-Control")).toBe(
      "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    )
    expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull()

    const body = await res.json()
    expect(body.status).toBe("ok")
    expect(body.service).toBe("nirjar.me")
    expect(body.region).toBe("iad1")
    expect(body.environment).toBe("production")
    expect(body.checks.edge_routing).toBe("ok")
    expect(body.checks.security_headers).toBe("enforced")
    expect(body.checks.static_assets).toBe("ok")
    expect(body.commit).toBeUndefined()
    expect(body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/)
    expect(body.version).toBeUndefined()
  })

  it("handles fallback region gracefully", async () => {
    const res = statusHandler()
    const body = await res.json()
    expect(body.region).toBe("local")
    expect(body.environment).toBe("development")
  })

  it("buildStatus generates valid schema", () => {
    const payload = buildStatus("fra1", "production")
    expect(payload.status).toBe("ok")
    expect(payload.region).toBe("fra1")
    expect(payload.environment).toBe("production")
  })
})

describe("Projects API (/api/projects)", () => {
  it("returns portfolio projects without stack field", async () => {
    const res = projectsHandler()
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(Array.isArray(body.projects)).toBe(true)
    expect(body.projects).toHaveLength(11)

    const trace = body.projects.find((p: { name: string }) => p.name === "Trace")
    expect(trace).toBeDefined()
    expect(trace.state).toBe("active")
    expect(trace.category).toBe("Digital Forensics & Incident Response")
    expect(trace.stack).toBeUndefined()
    expect(trace.repo).toBe("https://github.com/nirjxr26/Trace")
    expect(trace.case_study).toBe("/works/trace")
  })

  it("exports valid PORTFOLIO_PROJECTS array without stack", () => {
    for (const p of PORTFOLIO_PROJECTS) {
      expect(p.name).toBeTruthy()
      expect(["active", "maintained", "archived"]).toContain(p.state)
      expect(p.summary).toBeTruthy()
      expect((p as { stack?: unknown }).stack).toBeUndefined()
      expect(p.repo).toMatch(/^https:\/\/github\.com\//)
    }
  })
})

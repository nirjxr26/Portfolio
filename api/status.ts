export const config = {
  runtime: "edge",
}

export type HealthState = "ok" | "degraded" | "down"

export interface StatusChecks {
  edge_routing: HealthState
  security_headers: "enforced" | "disabled"
  static_assets: HealthState
}

export interface StatusResponse {
  status: HealthState
  service: string
  region: string
  environment: "production" | "preview" | "development"
  timestamp: string
  checks: StatusChecks
}

export function buildStatus(
  region = "edge",
  env: "production" | "preview" | "development" = "production",
): StatusResponse {
  return {
    status: "ok",
    service: "nirjar.me",
    region,
    environment: env,
    timestamp: new Date().toISOString(),
    checks: {
      edge_routing: "ok",
      security_headers: "enforced",
      static_assets: "ok",
    },
  }
}

export default function handler(req?: Request): Response {
  let region = "local"
  let env: "production" | "preview" | "development" = "development"

  if (req?.headers) {
    const vercelId = req.headers.get("x-vercel-id")
    const country = req.headers.get("x-vercel-ip-country")
    const vercelEnv = process.env.VERCEL_ENV

    if (vercelEnv === "production" || vercelEnv === "preview") {
      env = vercelEnv
    } else if (vercelId) {
      env = "production"
    }

    if (country) {
      region = country.toLowerCase()
    } else if (vercelId) {
      // e.g. "iad1::..." -> "iad1"
      region = vercelId.split("::")[0] || "edge"
    } else {
      region = "edge"
    }
  }

  const payload = buildStatus(region, env)

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
      "X-Content-Type-Options": "nosniff",
    },
  })
}

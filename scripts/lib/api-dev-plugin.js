/**
 * Vite dev plugin to execute /api/* edge function handlers locally
 * so localhost:5173/api/status and localhost:5173/api/projects work during development.
 */
export function apiDevPlugin() {
  return {
    name: "api-dev-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api/")) {
          return next()
        }

        const url = new URL(req.url, "http://localhost:5173")
        const pathname = url.pathname.replace(/\/$/, "")

        if (pathname === "/api/status") {
          try {
            const mod = await server.ssrLoadModule("/api/status.ts")
            const headers = new Headers()
            for (const [k, v] of Object.entries(req.headers)) {
              if (typeof v === "string") headers.set(k, v)
              else if (Array.isArray(v)) headers.set(k, v.join(", "))
            }

            const response = await mod.default(
              new Request(`http://localhost:5173${req.url}`, {
                method: req.method,
                headers,
              }),
            )

            res.statusCode = response.status
            response.headers.forEach((value, key) => {
              res.setHeader(key, value)
            })
            const body = await response.text()
            res.end(body)
            return
          } catch (err) {
            console.error("apiDevPlugin error (/api/status):", err)
            res.statusCode = 500
            res.end(JSON.stringify({ error: String(err) }))
            return
          }
        }

        if (pathname === "/api/projects") {
          try {
            const mod = await server.ssrLoadModule("/api/projects.ts")
            const response = await mod.default()

            res.statusCode = response.status
            response.headers.forEach((value, key) => {
              res.setHeader(key, value)
            })
            const body = await response.text()
            res.end(body)
            return
          } catch (err) {
            console.error("apiDevPlugin error (/api/projects):", err)
            res.statusCode = 500
            res.end(JSON.stringify({ error: String(err) }))
            return
          }
        }

        next()
      })
    },
  }
}

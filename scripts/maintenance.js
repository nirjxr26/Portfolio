import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const configPath = path.resolve(projectRoot, "vercel.json")
const DESTINATION = "/503"
const REWRITE = {
  // The 503 page is standalone, so every other path can be pointed at it.
  source: "/((?!503$|503\\.html$).*)",
  destination: DESTINATION,
}

const mode = process.argv[2]
if (!["on", "off", "status"].includes(mode)) {
  console.error("Usage: node scripts/maintenance.js <on|off|status>")
  process.exit(1)
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"))
const rewrites = Array.isArray(config.rewrites) ? config.rewrites : []
const enabled = rewrites.some((rule) => rule.destination === DESTINATION)

if (mode === "status") {
  console.log(`maintenance mode: ${enabled ? "on" : "off"}`)
  process.exit(0)
}

const next = rewrites.filter((rule) => rule.destination !== DESTINATION)
if (mode === "on") next.unshift(REWRITE)
config.rewrites = next

fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf-8")

if (mode === "on") {
  console.log("maintenance mode: on (all routes rewrite to /503)")
  console.log("Next: npm run build && git add vercel.json && git commit -m \"ops: enable maintenance page\" && git push")
} else {
  console.log("maintenance mode: off")
  console.log("Next: npm run build && git add vercel.json && git commit -m \"ops: disable maintenance page\" && git push")
}

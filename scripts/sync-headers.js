import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { cspProd, renderHeadersFile, renderVercelHeaders } from "./lib/headers.js"


const __filename = fileURLToPath(import.meta.url)
const projectRoot = path.resolve(path.dirname(__filename), "..")

function writeAtomic(target, contents) {
  const normalized = contents.endsWith("\n") ? contents : `${contents}\n`
  if (fs.existsSync(target) && fs.readFileSync(target, "utf8") === normalized) return false
  const tmp = `${target}.tmp`
  fs.writeFileSync(tmp, normalized, "utf8")
  fs.renameSync(tmp, target)
  return true
}

const headersFile = writeAtomic(path.resolve(projectRoot, "public/_headers"), renderHeadersFile(cspProd))

const vercelPath = path.resolve(projectRoot, "vercel.json")
const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"))
const nextHeaders = renderVercelHeaders(cspProd)
const vercelChanged = JSON.stringify(vercel.headers) !== JSON.stringify(nextHeaders)
vercel.headers = nextHeaders
const vercelChangedOnDisk = writeAtomic(vercelPath, `${JSON.stringify(vercel, null, 2)}\n`)

if (headersFile || vercelChanged) {
  console.log(
    `sync-headers: updated ${[headersFile && "public/_headers", vercelChangedOnDisk && "vercel.json"]
      .filter(Boolean)
      .join(", ")}`,
  )
} else {
  console.log("sync-headers: up to date")
}

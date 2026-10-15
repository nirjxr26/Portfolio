import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

/**
 * Scans a directory recursively and generates a map of
 * relative file paths -> content hashes (sha256 truncated to 8 chars).
 * e.g. { "/assets/trace/cli_hero.svg": "029dbd43" }
 */
export function generateAssetHashMap(baseDir, urlPrefix = "") {
  const map = {}
  if (!fs.existsSync(baseDir)) return map

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const ent of entries) {
      const full = path.join(current, ent.name)
      if (ent.isDirectory()) {
        walk(full)
      } else if (ent.isFile()) {
        const content = fs.readFileSync(full)
        const hash = crypto.createHash("sha256").update(content).digest("hex").slice(0, 8)
        const rel = path.relative(baseDir, full).split(path.sep).join("/")
        const key = `${urlPrefix}/${rel}`.replace(/\/+/g, "/")
        map[key] = hash
      }
    }
  }

  walk(baseDir)
  return map
}

/**
 * Returns a Vite plugin that defines __STATIC_ASSET_HASHES__ at build & dev time.
 */
export function assetHashPlugin(publicAssetsDir, urlPrefix = "/assets") {
  const virtualModuleId = "virtual:asset-hashes"
  const resolvedVirtualModuleId = "\0" + virtualModuleId

  return {
    name: "vite-plugin-asset-hash",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const hashes = generateAssetHashMap(publicAssetsDir, urlPrefix)
        return `export const assetHashes = ${JSON.stringify(hashes)};\nexport default assetHashes;`
      }
    },
  }
}

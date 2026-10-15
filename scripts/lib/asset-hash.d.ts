import type { Plugin } from "vite"

export function generateAssetHashMap(baseDir: string, urlPrefix?: string): Record<string, string>
export function assetHashPlugin(publicAssetsDir: string, urlPrefix?: string): Plugin

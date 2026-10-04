export interface CacheRule {
  source: string
  cacheControl: string
}

export declare const cspProd: string
export declare const cspDev: string
export declare const inlineScriptHash: string
export declare const REVALIDATE_CACHE: string
export declare const IMMUTABLE_CACHE: string
export declare const CACHE_RULES: CacheRule[]

export declare function baseHeaders(csp: string): Record<string, string>
export declare function renderHeadersFile(csp?: string): string
export declare function renderVercelHeaders(
  csp?: string,
): { source: string; headers: { key: string; value: string }[] }[]

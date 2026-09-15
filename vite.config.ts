import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Production CSP — strict, no 'unsafe-inline' anywhere, no third parties.
// Safe because the production build emits zero inline scripts (only external
// modules + a JSON-LD data block, which browsers don't execute) and zero
// inline styles (Tailwind compiles to an external stylesheet; no style={} in
// src). Fonts are self-hosted in /fonts, so style-src/font-src stay 'self'.
const cspProd = [
  "default-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "object-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "font-src 'self'",
  "img-src 'self' data: https:",
  "media-src 'self'",
  "connect-src 'self'",
  "worker-src 'self'",
  "prefetch-src 'self'",
  "upgrade-insecure-requests",
  "block-all-mixed-content",
].join("; ")

// Dev-only CSP — relaxed with 'unsafe-inline' because Vite's dev machinery
// requires it (@vitejs/plugin-react inline preamble + HMR `<style>` injection).
// Never ship this to production.
const cspDev = [
  "default-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: https:",
  "media-src 'self'",
  "connect-src 'self' ws:",
  "worker-src 'self'",
  "prefetch-src 'self'",
  "upgrade-insecure-requests",
  "block-all-mixed-content",
].join("; ")

function baseHeaders(csp: string) {
  return {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), fullscreen=(self), display-capture=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "credentialless",
    "Origin-Agent-Cluster": "?1",
    "X-DNS-Prefetch-Control": "off",
    "X-Permitted-Cross-Domain-Policies": "none",
    "Content-Security-Policy": csp,
  }
}

// NOTE: No Report-To / NEL headers on purpose — this is a backend-less static
// site, so there is no collector endpoint. Dead reporting headers would only
// create a false sense of monitoring. Re-add them if a report collector exists.

const prodHeaders = baseHeaders(cspProd)
const devHeaders = baseHeaders(cspDev)

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react-vendor"
          }
        },
      },
    },
  },
  server: {
    // `vite dev` serves the relaxed policy; `vite preview` + Vercel serve strict.
    headers: command === "serve" ? devHeaders : prodHeaders,
  },
  preview: {
    headers: prodHeaders,
  },
}))

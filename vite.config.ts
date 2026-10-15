import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { baseHeaders, cspDev, cspProd } from "./scripts/lib/headers.js"
import { assetHashPlugin } from "./scripts/lib/asset-hash.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const prodHeaders = baseHeaders(cspProd)
const devHeaders = baseHeaders(cspDev)

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    assetHashPlugin(resolve(__dirname, "./public/assets"), "/assets"),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    assetsDir: "_assets",
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
    headers: command === "serve" ? devHeaders : prodHeaders,
  },
  preview: {
    headers: prodHeaders,
  },
}))

import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { createServer } from "vite"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, "../..")
const compiledDir = path.resolve(projectRoot, "src/features/articles/data/compiled")

// 1. Build md-compiler native binary
execFileSync(
  "cargo",
  [
    "build",
    "--manifest-path",
    path.resolve(projectRoot, "tools/md-compiler/Cargo.toml"),
    "--release",
  ],
  { cwd: projectRoot, stdio: "inherit" },
)

// 2. Load articles via Vite SSR
const vite = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent",
})

let blogMod
try {
  blogMod = await vite.ssrLoadModule("/src/features/articles/data/blogArticles.ts")
} finally {
  await vite.close()
}

const { BLOG_ARTICLES } = blogMod

// 3. Compile all articles via Rust md-compiler
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "md-compiler-"))
try {
  for (const article of BLOG_ARTICLES) {
    const parts = []
    for (const section of article.sections) {
      parts.push(`<<<SECTION:${section.subtitle ?? ""}>>>`)
      parts.push(section.content ?? "")
      parts.push("<<<END_SECTION>>>")
    }
    fs.writeFileSync(path.join(tmpDir, `${article.slug}.txt`), parts.join("\n"), "utf-8")
  }

  fs.mkdirSync(compiledDir, { recursive: true })
  const mdExe = path.resolve(
    projectRoot,
    `tools/md-compiler/target/release/md-compiler${process.platform === "win32" ? ".exe" : ""}`,
  )
  execFileSync(mdExe, [tmpDir, compiledDir], { cwd: projectRoot, stdio: "inherit" })
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true })
}

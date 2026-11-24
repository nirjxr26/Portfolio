import { execFileSync, spawnSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

function findCargo() {
  // 1. Try standard cargo in PATH
  const check = spawnSync(process.platform === "win32" ? "where.exe" : "which", ["cargo"], {
    stdio: "pipe",
    encoding: "utf8",
  })
  if (check.status === 0 && check.stdout.trim()) {
    return "cargo"
  }

  // 2. Try default user profile cargo bin
  const userCargo =
    process.platform === "win32"
      ? path.join(os.homedir(), ".cargo", "bin", "cargo.exe")
      : path.join(os.homedir(), ".cargo", "bin", "cargo")

  if (fs.existsSync(userCargo)) {
    return userCargo
  }

  return null
}

const cargoBin = findCargo()

if (!cargoBin) {
  console.error(
    "⚠️  Cargo/Rust is not detected in PATH or ~/.cargo/bin. Please install Rust via https://rustup.rs",
  )
  process.exit(1)
}

const manifestPath = path.resolve(import.meta.dirname, "..", "tools", "site-verifier", "Cargo.toml")
const distPath = path.resolve(import.meta.dirname, "..", "dist")

try {
  execFileSync(cargoBin, ["run", "--manifest-path", manifestPath, "--", distPath], {
    stdio: "inherit",
    env: process.env,
  })
} catch {
  process.exit(1)
}

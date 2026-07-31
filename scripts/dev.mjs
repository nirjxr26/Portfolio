import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const ICONS_DIR = fileURLToPath(new URL("../public/icons", import.meta.url));

function runGen() {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ["scripts/gen-icon-version.mjs"], {
      cwd: ROOT,
      stdio: "inherit",
    });
    child.on("exit", () => resolve());
  });
}

await runGen();

let timer = null;
watch(ICONS_DIR, { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    await runGen();
  }, 250);
});

const nextCmd = process.platform === "win32" ? "npm.cmd" : "npm";
const next = spawn(nextCmd, ["run", "next-dev"], {
  cwd: ROOT,
  stdio: "inherit",
  shell: process.platform === "win32",
});

const shutdown = () => {
  next.kill();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
next.on("exit", (code) => process.exit(code ?? 0));

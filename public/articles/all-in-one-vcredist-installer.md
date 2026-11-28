---
title: "All-in-One VCRedist Installer"
description: "Fix missing MSVCP140.dll, d3dx9_43.dll, and VCRUNTIME140.dll errors in one run with 16 Windows gaming runtime installers."
date: "2026-11-28"
category: "Practice"
canonical: "https://nirjar.me/articles/all-in-one-vcredist-installer"
readTime: "2 min"
---

# All-in-One VCRedist Installer

> Fix missing MSVCP140.dll, d3dx9_43.dll, and VCRUNTIME140.dll errors in one run with 16 Windows gaming runtime installers.

- **Published**: November 28, 2026
- **Category**: Practice
- **Read Time**: 2 min
- **Canonical**: https://nirjar.me/articles/all-in-one-vcredist-installer

Installed an older PC game on a fresh Windows and got *"MSVCP140.dll was not found"*, *"d3dx9_43.dll is missing"*, or *"VCRUNTIME140.dll not found"*? Every one of these means a runtime is missing. The usual fix is to find the right download, install it, relaunch the game, and then repeat for the next missing file.

I bundled everything into one folder so you only do this once.

## What's inside

16 installers, plus an optional Windows feature step, all handled by `install-all.bat`:

- **Visual C++ Redistributables (2005–2022):** both `x86` and `x64`, because 32-bit games still need the `x86` runtimes on 64-bit Windows.
- **DirectX End-User Runtime (June 2010) and OpenAL:** the legacy graphics and audio libraries older titles still expect.
- **Microsoft XNA Framework 4.0 and .NET Desktop Runtime 8.0:** needed by indie and modern .NET-based games.
- **.NET Framework 3.5 (optional Windows feature):** enabled directly via `dism` (no separate installer file) for 2006–2012 era games.

## How to use it

1. **Download** — Download the `.RAR` archive above or get the folder directly from [GitHub](https://github.com/nirjxr26/vcredist-all-in-one-setup).
2. **Extract** — Extract the entire archive to a folder on your PC.
3. **Run the installer** — Open the extracted folder and double-click `install-all.bat`.
4. **Grant permission** — Click Yes when Windows asks for administrator access.
5. **Wait for installation** — The script automatically installs the included runtimes. Do not close the window while installation is in progress.
6. **Launch your game** — Once the installation summary appears, close the installer and launch your game.

## What the script does

- **Installs silently, one by one:** no popup wizards and no mid-script reboots.
- **Handles real-world messiness:** already-installed versions count as a pass, missing files are skipped, and if Windows Installer is busy (`1618`) it waits 5 seconds and retries once.
- **Works mostly offline:** only the DirectX web setup and the optional .NET Framework 3.5 step need internet.
- **Gives you a clear result:** a final summary of succeeded, skipped, failed, and reboot-needed items, plus a full log at `%TEMP%\vcredist-install-log.txt`.

If the summary says a reboot is recommended, restart once before launching your game.

The script is plain batch, so you can open `install-all.bat` in Notepad and read exactly what it runs before you trust it. All bundled setups are official Microsoft and OpenAL redistributables.

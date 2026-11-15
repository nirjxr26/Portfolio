---
title: "How VaultLock Reliably Fetches Brand Logos"
description: "How VaultLock gets the right brand logo every time without breaking the UI: ingestion, caching, and resilience."
date: "2026-04-08"
category: "Security"
canonical: "https://nirjar.me/articles/how-vaultlock-reliably-fetches-brand-logos"
readTime: "2 min"
---

# How VaultLock Reliably Fetches Brand Logos

> How VaultLock gets the right brand logo every time without breaking the UI: ingestion, caching, and resilience.

- **Published**: April 8, 2026
- **Category**: Security
- **Read Time**: 2 min
- **Canonical**: https://nirjar.me/articles/how-vaultlock-reliably-fetches-brand-logos

## Showing a logo sounds trivial. It isn't.

In VaultLock, I needed something that could take "GitHub" or "facebook.com" and return the right icon — without crashing the UI or making external requests. Getting there took more architecture than I expected.

## The wrong first solution

The first solution was to let QML handle it: fetch the URL, render the icon. This fell apart quickly. Qt's icon components aren't consistently available across the stack. Rendering remote images caused glitches and crashes. And if the UI is making external requests based on user input, you've handed control of what gets fetched to whoever's typing.

So I moved everything into the backend.

## Input normalization

Users don't enter clean data. They type "Google", "linkedin.com", "https://facebook.com", or whatever they remember.

The first step is normalization — extract a domain if there's a URL, check a brand dictionary, fall back to guessing name.com. By the time anything downstream runs, the input is a clean domain.

## Caching, then fetching

Before any network call goes out, the system checks memory, then bundled assets, then disk. Most repeat lookups never hit the network at all. When they do, the request goes to one of three sources: Clearbit, Google's favicon service, or DuckDuckGo's favicon service. No user controlled endpoints.

## Validation and storage

Every response gets validated before it touches the cache: HTTP 200, at least 500 bytes, valid Content-Type, and magic bytes that actually match the claimed format. Anything that fails gets discarded. Filenames are md5 hashes of the domain; writes go to a temp file and get renamed. The plumbing is boring on purpose.

## When fetching fails

When the UI doesn't get a file path, it renders a badge — a dark gradient radiused square with the first two letters of the service name, or ?? if there's nothing to pull from.

On the backend, logo_manager.py adds the domain to failed_domains and skips it going forward. No retries. The badge stays, nothing broken gets shown.

## UI isolation

VaultLock UI doesn’t fetch, validate, or guess, it never sees any of this logo fetching process.

Thats why VaultLock is reliable.

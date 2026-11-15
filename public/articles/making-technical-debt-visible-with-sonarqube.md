---
title: "Making Technical Debt Visible with SonarQube"
description: "One SonarQube scan exposed 872 hidden issues. What I did over the next 30 days to fix what I couldn't see before."
date: "2026-05-25"
category: "Practice"
canonical: "https://nirjar.me/articles/making-technical-debt-visible-with-sonarqube"
readTime: "3 min"
---

# Making Technical Debt Visible with SonarQube

> One SonarQube scan exposed 872 hidden issues. What I did over the next 30 days to fix what I couldn't see before.

- **Published**: May 25, 2026
- **Category**: Practice
- **Read Time**: 3 min
- **Canonical**: https://nirjar.me/articles/making-technical-debt-visible-with-sonarqube

## Why bother

Before SonarQube, most checks were reactive — linting, manual review, runtime debugging. That approach misses a lot: security hotspots, duplicated logic, unstable React hooks, unsafe async handling, cognitive complexity creeping up unnoticed.

The goal wasn't perfect code. It was measurable code.

## What the first scan found

The first scan was uncomfortable. Issues that had existed for weeks, invisible until now.

872 total issues on day one. 215 bugs, 76 vulnerabilities, 8 security hotspots, 90+ code smells, and ~9.7% duplicated code. Quality Gates: 0% passing.

None of it was catastrophic in isolation. The problem was accumulation.

## Frontend problems

The React frontend had issues that worked fine locally but were risky at scale — stale useEffect dependencies, unsafe state updates, duplicated validation logic, inconsistent null handling.

One component had a cognitive complexity score of 24, three duplicated validation blocks, and five hook dependency warnings. After refactoring: complexity dropped to 11, duplication gone, render stability improved.

## Backend security findings

The backend scan was more interesting. Input validation was inconsistent between routes — some payloads validated, others weren't. Not an immediate exploit, but an obvious gap.

A few validators had regex patterns that could cause catastrophic backtracking under crafted payloads. Rewrote them with bounded patterns. JWT handling had duplicated token verification logic scattered across middleware — centralizing it cut auth-related duplication by 38%. A handful of debug logs were also leaking partial tokens and internal error structures, flagged as hotspots and cleaned up.

None of these were dramatic. That's kind of the point — small, risky patterns that compound over time.

## 30 days of cleanup

Started at 872. Closed out at 479 — security at 21, reliability at 192, maintainability at 266, duplications down to 7.3%, and hotspots reviewed at 0.0%.

Still work left. But the numbers moved, and that's the point — technical debt went from abstract to visible.

Technical debt went from abstract to visible. That made it fixable.

## Quality gates changed the workflow

Every pull request now gets scanned automatically. Builds fail if vulnerabilities exceed threshold, duplication increases, coverage drops, or critical issues appear.

The pipeline blocks obvious problems before they need manual review.

## What I'd do differently

Add SonarQube earlier. Scanning a large existing codebase all at once creates noisy reports and a backlog that's demoralizing to look at. Starting from the first commit keeps issue counts manageable and the feedback loop tight.

Take security hotspots seriously from day one. Most of them weren't immediately exploitable — but they all represented unclear intent or risky patterns. Ignoring them early just defers the cleanup.

Watch cognitive complexity. The hardest files to maintain were almost always the ones SonarQube flagged first. That correlation held consistently.

## Final thought

SonarQube didn't fix anything on its own. It made problems impossible to ignore — vulnerability counts, duplication percentages, complexity scores, failed quality gates. Once the numbers were visible, the work became obvious.

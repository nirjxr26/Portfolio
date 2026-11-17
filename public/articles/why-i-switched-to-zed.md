---
title: "Why I Switched to Zed IDE"
description: "Four years of muscle memory, extensions and workspace config didn't break. The editor just got quieter, faster, and out of the way."
date: "2026-11-17"
category: "Practice"
canonical: "https://nirjar.me/articles/why-i-switched-to-zed"
readTime: "4 min"
---

# Why I Switched to Zed IDE

> Four years of muscle memory, extensions and workspace config didn't break. The editor just got quieter, faster, and out of the way.

- **Published**: November 17, 2026
- **Category**: Practice
- **Read Time**: 4 min
- **Canonical**: https://nirjar.me/articles/why-i-switched-to-zed

I didn't plan to switch editors. For about four years, VS Code was simply where I worked. It was on every machine, it opened every project, and it handled my Git, my terminal and my extensions. I never thought of it as a tool I was choosing, because it was just there.

Then a few days ago I came across [Zed](https://zed.dev/) while scrolling, and I noticed it was written in Rust. My first thought was “that must be fast,” which is a slightly embarrassing reason to download an editor. I wasn't looking for a VS Code replacement and had no plan to move anything. I just wanted to see what it felt like.

## What VS Code did well

I want to say this plainly, because it's the reason I stayed for four years:

- **Extensions**: If something doesn't exist natively, someone has probably already built it.
- **Ecosystem**: Language support is mature and covers almost everything I've touched.
- **Debugging and remote development**: Both are well integrated and well documented, Dev Containers included.
- **Community**: Almost any question I've had already has an answer somewhere.

## The friction I'd stopped noticing

None of what follows was a real problem, which is exactly why I never did anything about it:

- **Startup**: I'd open a project and wait a moment for everything to load. It wasn't long. It was just long enough to become part of the routine.
- **Setup**: Over four years my extensions, settings and workspace config had grown into a small system of its own. I'd probably forgotten how much of it was there.
- **Occasional waiting**: Little pauses, here and there, throughout the day.
- **Git**: I'd make a few changes, switch branches, and then check Source Control only to find myself waiting for the state to catch up. Eventually I'd just run `git status` in the terminal, because it was faster to ask Git directly.

I think this is the trade-off of flexibility. An editor that can become anything accumulates things. Each piece was useful, but together they added a low, constant hum of friction, and I'd simply learned to tolerate it. I spent a surprising amount of mental energy working around the editor instead of working on the code, and I hadn't noticed.

## The first thing I noticed about Zed

It wasn't a feature. It was the lack of waiting. I opened Zed and I was already looking at my project.

That sounds trivial, but I open my editor many times a day, and small delays repeated that often add up. The difference was most noticeable on some of my larger repositories, where I was used to waiting for the editor to settle before getting into the code. I don't have a benchmark to quote, and I won't make one up. It's a personal observation, and it depends on my machine and my projects.

What stood out over the first few days:

- **Startup**: Open the editor and the project is there.
- **Navigation**: Jumping between files and searching felt immediate.
- **Responsiveness**: Typing stayed smooth even in larger projects.
- **Git**: It felt lightweight, and I could follow my changes without double-checking them in the terminal.
- **Terminal and editor**: They felt like one workflow rather than two tools side by side.

Performance isn't a number I read off a chart. It's how quickly the editor gets out of my way.

## What might explain the speed

I'm not going to pretend I know Zed's internals. From what I've read, it's written in Rust and uses its own UI framework instead of embedding a browser engine, and I'd guess that explains part of what I feel. But “Rust, therefore fast” is too simple. Plenty of slow software is written in fast languages. I suspect it's the whole set of design choices working together, not any single one. What I can say for certain is how it feels from the outside: fewer interruptions.

## The editor got quieter

This was the part I didn't expect. Zed has a smaller interface, fewer panels and fewer things asking for attention, so the code ends up in the center of the screen. It's also more opinionated, which means less configuration. I didn't realize how much of my old setup was configuration until I stopped configuring my editor.

For my workflow, I've needed fewer extensions than I expected. Most of what I use day to day is built in, and I haven't missed the rest yet.

## What VS Code still does better

- **Extensions**: The gap here is real. If your workflow leans on a specific extension, moving could be painful.
- **Debugging and remote development**: Both are more mature in VS Code, and for some projects I'd still reach for it.
- **A mature ecosystem**: Years of documentation, answers and tooling can't be replicated quickly.
- **Muscle memory**: After four years my hands still go for the VS Code shortcuts, and that takes time to retrain.

## Where Zed is still young

It's younger, and that shows. Some workflows I'm used to don't exist yet, and the more opinionated design is refreshing most days. Occasionally, though, I think “I know exactly how I want this configured, so why can't I?” It isn't universally better, and I don't think it's trying to be.

I'm also still working out how I want to use its AI features, so I'll leave that for another time.

## What I use Zed for

Most of what I write these days isn't for a particular project. I code to learn: how an API behaves, how authentication actually works, what a library does when I push on it. The editor is where those experiments happen, so it matters that it stays out of the way.

Lately most of that has been Rust. I'm learning it from scratch, aiming for the advanced parts, and I'll admit I'm a little obsessed. It was part of why I tried Zed at all, and there's something satisfying about learning a language inside a tool built with it.

My approach is simple:

- **Build small things from scratch**: A CLI tool, a tiny HTTP server, a JSON parser. I get stuck, then look up only what I need.
- **Read the compiler's errors properly**: Understanding why the borrow checker refuses something teaches me more than applying its suggested fix.
- **Read real code**: Open-source Rust projects show how experienced developers structure modules, errors and traits.
- **Work towards bigger things**: Concurrency and async first, then something that talks to a real API, with proper error handling and tests.

I don't have a deadline. The experiments are the point: open a project, try something, break it, understand why, and try again without fighting the tools around me.

## Opening Zed first

VS Code is still an excellent editor, and I'll keep it installed for the cases where its ecosystem matters. My priorities changed. I started caring more about startup time, simplicity, and how little sits between opening a project and working on it.

I didn't uninstall VS Code. I didn't make some dramatic switch. I just stopped opening it first.

And I think that's when I actually switched.

## The speed made it easy

It was the speed that helped me get used to Zed, and it's why I kept using it. Everything else I noticed came after.

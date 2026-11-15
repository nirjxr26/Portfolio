---
title: "Rethinking My Git Workflow"
description: "How GitHub and commit discipline reshaped the way I build software, and the Git workflow I use now."
date: "2026-04-16"
category: "Practice"
canonical: "https://nirjar.me/articles/rethinking-my-git-workflow"
readTime: "3 min"
---

# Rethinking My Git Workflow

> How GitHub and commit discipline reshaped the way I build software, and the Git workflow I use now.

- **Published**: April 16, 2026
- **Category**: Practice
- **Read Time**: 3 min
- **Canonical**: https://nirjar.me/articles/rethinking-my-git-workflow

## Before GitHub

My actual setup at that time was pretty messy: a folder. Inside that folder, files with names like main_final.py, main_final_v2.py, main_final_v2_REAL.py. No backup. No structure.

When something broke — and things broke — I'd either spend an hour undoing changes by memory or just start over.

I didn't know that was a bad system until I lost work I actually cared about.

## Discovering GitHub

When I finally used it properly, the first thing I did was create a repo, clone it locally, and just start pushing code.

Every time I finished something — even something small — I'd stage it, commit, push. Open GitHub, see it sitting there. Green squares filling in. It kept me going more than I expected.

The better part was opening a repo weeks later and actually being able to see what happened. Not piece it together. Just read it.

## What Changed

Version control was the first thing that actually helped. Something breaks, I find the last commit where it didn't and roll back. That spiral of "what did I even change" doesn't happen much anymore — and when it does, I can just check.

Commit messages I still get lazy with sometimes. But even a half-decent message is better than nothing when you're staring at a diff three weeks later with no memory of what you were doing.

Branches I didn't use properly for a while. Before, trying something new meant duplicating the folder or just making the change and hoping. Now I branch off, try it, merge or delete. I started finishing things I would've dropped.

## Accidental Portfolio

I wasn't thinking about GitHub as a portfolio when I started. I was just pushing code. But when I started applying for internships, having repos with real commit history and READMEs made a difference I didn't anticipate. Recruiters could just look. No explaining, no describing — just a link.

Collaboration I haven't used that much yet. But the few times I have, it beat sending files over chat and hoping nobody touched the wrong thing.

## What I Learned

Commit messages actually matter. "fix stuff" is fine until you're debugging at midnight with no memory of what changed. Even "fix auth redirect on logout" takes five seconds and has saved me real time more than once.

README files I kept skipping. Still do sometimes. But I've opened old projects with no idea how to run them — including ones I built myself. At that point documentation stops being optional.

Pushing regularly matters more than I thought. One big commit at the end tells you nothing about how the project came together. The history only works if you actually built it along the way.

## Final Thoughts

I avoided GitHub for a long time because it felt like extra work. It wasn't. I was just skipping the part where I treated my own projects seriously.

Commit regularly. Write messages that mean something. Keep things in repos.

That's most of it — the rest you figure out as you go.

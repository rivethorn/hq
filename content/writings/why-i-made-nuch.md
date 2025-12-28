---
title: I turned a small script into an app
tag: Development
ttr: 5 min read
description: A small automation script slowly grew into a proper CLI app, and it ended up becoming NUCH — a Nuxt Content helper I actually enjoy using.
author: Hassan Qasemi
date: 2025-12-28
---

## A small recap

I've [already](/writings/road-to-here) talked about how I struggled with choosing the right stack for this site. I know, I know — it *really* shouldn’t be that hard. But I’m a difficult man. And I’m also a firm believer in the idea that *“a little over‑engineering is good for your soul.”*

Still, life doesn’t always allow for that luxury. Sometimes, you just have to take the high road.

In this case, that high road turned out to be Nuxt Content.

## Getting started with Content

> “Nuxt Content is a module for Nuxt that provides a simple way to manage content for your application. It allows developers to write their content in Markdown, YAML, or JSON files and then query and display it in their application.”

That’s their official description, and I didn’t want to butcher it.

My first thought was something along the lines of: *“I’m a Nuxt developer, I* ***usually*** *like simple solutions… and wait, Markdown?”* — yeah, that was basically a no‑brainer.

So I got to work.

I added the module, set up the config file and collections, and started testing.

It was an absolute breeze. It picked up the files instantly and rendered them beautifully. With a few small tweaks and customizations, it started to look exactly the way I wanted.

It was *almost* everything I needed.

Almost.

## The new (kinda) dilemma

From what I could tell, there are two main ways to add files to Nuxt Content collections:

1. Manually placing files inside the `content` directory
2. Linking an external repository to a collection

Naturally, my brain went: *“Alright… where’s the challenge?”*

I didn’t want to use an external repository — I already have my own archives, and GitHub just isn’t where I keep this kind of stuff. Manually moving files every time also felt tedious and error‑prone.

So, once again, I got to work.

## The script

When it comes to simple automation, scripts are usually the first thing that comes to mind. So I wrote one that handled the basics:

1. Copy the given file into the correct collection directory
2. Copy any corresponding images
3. Stage the changes, commit them, and push the site’s repository to trigger a new build

It worked. It did exactly what it was supposed to do.

But it was fragile.

The destination paths were hard‑coded. Adding or editing a collection meant editing the script itself. There were no safety checks, no proper error handling — if something went wrong halfway through, manual cleanup was the only option.

I liked the simplicity, but I didn’t trust it. It felt like something that could (and eventually would) break at the worst possible moment.

## The app

That’s when I decided to turn the script into a proper CLI tool.

Doing so would make it easier to extend, safer to use, and far more pleasant to maintain. More importantly, it would allow me to handle errors properly — and even roll back changes when necessary.

[Unsurprisingly](/writings/my-aoc-experience), I chose Rust.

There were a few reasons for that. First, I genuinely wanted to *work* with Rust — not just toy examples, but something real. Second, I’d already solved a bunch of problems with it during Advent of Code, and I actually enjoyed the experience. Sure, it has its quirks, but those quirks force you to think more deliberately — and I like that.

Funny enough, I initially tried building this in Go. But after Advent of Code, something shifted. Despite all the time I’ve spent with Go, my brain just… stopped thinking in it.

Rust didn’t just help my thinking — it *changed* it.

## And so… NUCH was born

NUCH (short for **NUxt Content Handler**) is what came out the other side.

It’s a simple, interactive CLI tool that does everything I needed — and then some.

It relies on a straightforward `toml` configuration file to understand where things live and where they should go. From there, you just tell it what you want.

Right now, it supports two commands: `publish` and `delete`. Maybe more will come in the future — we’ll see.

I won’t dive into the internal details here. Those are covered properly in the [documentation](https://nuch.vercel.app). The source code is also available on [GitHub](https://github.com/rivethorn/nuch), and contributions are more than welcome.

## Epilogue

Like most tools, this one exists simply to make my life a little easier.

If it manages to do the same for you, then it’s already done its job.

If you’re a Nuxt developer — or just curious — I’d love to hear your [suggestions](https://github.com/rivethorn/nuch/issues/new) or [general thoughts](mailto:hassanak813@outlook.com) about NUCH.

Merry Christmas, and happy holidays 🎄
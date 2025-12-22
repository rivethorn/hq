---
title: I wanted to use Supabase as the backend for this site
tag: Development
ttr: 4 min read
description: I was wrong
author: Hassan Qasemi
date: 2025-12-22
---
## Over-engineer the World!

The first thing that came to mind when I decided to start this site was: *"I’m not going to build a static site."* I knew a static setup was probably the right choice for a project like this, but I simply didn’t want to go that route.

It felt too bland for my taste.

*"Why would I use an SSG like every other sane human being? I want to over‑engineer my stack—otherwise, what’s the point of living? Live dangerously. Live on the edge."* That sort of thing.

I was already using [Markdown](https://www.markdownguide.org/) with [Obsidian](https://obsidian.md/) for note‑taking, so I was very familiar with it. It’s also a joy to write in, so I **obviously** wanted to keep using it for blogging.

So I got to work. I chose Nuxt for the frontend simply because it’s a framework I somewhat know and genuinely enjoy working with. Then I jumped onto Supabase.

I’d had a tiny bit of experience with Supabase before. I knew it was a BaaS (Backend‑as‑a‑Service), meaning it was supposed to make backend work much easier. I knew it had solid documentation, and I knew it was cool to use. (It _is_ cool to use, right?)

My thought process went something like this:

- **On Supabase:**
    1. Create a storage bucket for Markdown files.
    2. Create a database table to store blog metadata—things like slugs and tags.
- **With Nuxt:**
    1. Build the frontend and connect it to Supabase.
    2. Fetch Markdown files from Supabase and render them on demand. (Nuxt has excellent tooling for rendering Markdown.)
- **For writing blogs:**
    1. Upload the Markdown file to the Supabase storage bucket.
    2. Add a metadata row to the database...

Wait.
What?

You’re telling me I have to add or remove every blog post by logging into Supabase and doing it **manually, every single time**?

Nope.

I’m making an app for that.

## Enter… hermes-md

There was no way I was letting go of the absolute overkill of a stack I had chosen.

No. Absolutely not.

Instead, I built a small CLI tool called [hermes-md](https://github.com/rivethorn/hermes-md). I initially tried writing it in Rust—let’s just say it didn’t go well. So I switched to TypeScript and used Supabase’s official [client library](https://supabase.com/docs/reference/javascript).

And it turned out okay.

You give the tool your file, it extracts the metadata from the top, uploads the Markdown file to storage, and inserts the metadata into the database—all with a single command.

Nice.

## Time for some action

Once everything was wired together, it was time to test.

I didn’t even deploy the site. I was running it locally, but in a production‑like environment.

I had high hopes.

They were completely crushed.

The data‑fetching was sloppy. You could say _“skill issue,”_ and I’d agree—if I hadn’t already made sure the app only requested data when it actually needed to. I spent two full days analyzing the problem and trying to fix it.

It didn’t help.

Things improved, sure, but not nearly enough. This wasn’t how it was supposed to behave. You don’t expect to stare at a loading indicator for a full second while a blog post is fetched from a storage bucket and rendered.

##### So I started digging deeper.

Most developer blogs I visited—both from people I knew and people I didn’t—were built with SSGs.

Every template I looked at—Next.js, Nuxt, Astro—used some form of static generation.

That’s when it hit me.

## I got humbled

I finally made peace with the fact that not **everything** needs to be over‑engineered. Sure, pushing your limits is fun, and it helps you grow as a developer.

But when **everyone** is using a tool that has repeatedly proven itself, the problems will eventually catch up to you if you insist on swimming against the current.

As for what I did next—well, that’s a story for another time.

See you soon.
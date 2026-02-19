---
title: Why I Moved My Blog from Cloudflare to Vercel
date: 2026-02-15
description: not for performance, but for better flow, simpler analytics, and a smoother developer experience.
tag: Developer Experience
ttr: 6 min read
author: Hassan Qasemi
---

For a long time, my blog lived on Cloudflare.

It was fast, globally distributed, inexpensive, and reliable. In many ways, it was exactly what you would want for a static or hybrid site. And for a while, it did its job well.

Yet recently, I moved the entire site to Vercel.

This post isn’t a comparison of benchmarks, edge latency, or pricing tiers. It’s a reflection on **developer experience**, tooling alignment, and the cumulative weight of small frictions — especially when working with Nuxt.

Sometimes, infrastructure decisions are less about raw capability and more about how invisible they become over time.

---

## Cloudflare Was Solid — Just Not Invisible

To be clear: Cloudflare wasn’t broken.

Pages, Workers, and the surrounding ecosystem are impressive. The edge-first model, the control you get over caching and routing, and the pricing structure are genuinely compelling. If you enjoy tuning infrastructure and understanding exactly how your app executes at the edge, Cloudflare is a strong choice.

My blog never had uptime issues. Builds worked. Performance was good.

But despite all that, Cloudflare never fully disappeared into the background.

There was always *something* to think about:

- Edge runtime differences
- Platform-specific APIs
- Small mismatches between local development and production
- Nuxt features that worked, but felt slightly constrained or indirect

None of these were blockers. But they added friction to something that is supposed to be simple: writing and publishing.

---

## Nuxt Feels “At Home” on Vercel

One of the biggest factors in the move was how naturally **Nuxt fits into Vercel’s mental model**.

Nuxt already assumes:

- A clear separation between server and client code
- Predictable deployment targets
- Opinionated defaults for SSR, SSG, and hybrid rendering

On Vercel, those assumptions line up almost perfectly.

The deployment process is boring in the best way:

- Push to Git
- Automatic preview deployment
- Production behaves exactly like preview
- Logs are clear and accessible
- Environment variables work as expected, without edge-specific surprises

I didn’t have to think about *where* my code runs. I could just think about *what* it does.

That alignment matters more than I expected.

---

## Adding Vercel Analytics to a Nuxt Project

One very tangible reason for the move was **Vercel Analytics**.

I don’t want complex dashboards or third-party scripts on a personal blog. I want basic answers:

- Are people reading?
- Which pages get attention?
- Did something break after a deploy?

With Vercel, enabling analytics in Nuxt is almost boringly simple.

Install the module:

```bash
npm install @vercel/analytics
```

Then enable it in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
    modules: ['@vercel/analytics/nuxt']
});
```

That’s it.

No scripts to manage. :br
No consent popups. :br
No external dashboards to configure.

The analytics are privacy-friendly, integrated into the platform, and scoped exactly to what I need — nothing more.

---

## Fewer Platform-Specific Workarounds

Another quiet benefit of the move was the reduction in platform-specific conditionals.

On Cloudflare, certain things required extra care:

- Edge runtime limitations leaking into server logic
- Nuxt features that worked, but needed adjustments
- APIs that behaved slightly differently depending on context

Again, none of this was catastrophic. But it meant thinking about the platform *while* building features.

On Vercel, I find myself writing more “plain Nuxt” code. The platform mostly stays out of the way, and that lowers cognitive load — especially for a solo project.

---

## Opinionated Defaults Are a Feature

Cloudflare gives you power. :br
Vercel gives you defaults.

At this stage, I value defaults more.

Routing, headers, caching behavior, previews, and framework integrations are all handled in a way that feels intentionally boring. There are fewer knobs to turn, but also fewer ways to surprise yourself.

For a personal site, that trade-off makes sense.

I don’t want infrastructure to be a creative decision.

---

## This Wasn’t About Speed or Scale

It’s worth saying explicitly: this move wasn’t about performance.

Both Cloudflare and Vercel are fast. :br
Both scale far beyond what this site will ever need. :br
Both are reliable.

If you’re optimizing for edge control, Cloudflare might still be the better choice.

This move was about **comfort**, predictability, and flow.

---

## Choosing the Platform That Disappears

At this point, my blog isn’t an experiment. It’s a place to write, publish, and occasionally rethink ideas. The infrastructure should fade into the background.

Vercel does that better *for me* — especially when paired with Nuxt.

That doesn’t make it universally better. :br
It doesn’t invalidate Cloudflare. :br
And it doesn’t mean I won’t move again someday.

It just means that right now, the trade-offs align with how I want to work.

And sometimes, that’s the most honest reason to move anything.

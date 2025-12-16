# hq

My personal blog and writing space.

This repository contains the source code for **hq**, a minimalist blog site built with **Nuxt**, **Vue**, and **TypeScript**. It’s designed to be fast, calm, and content‑first — a place for long‑form writing, technical notes, and experiments without unnecessary noise.

## Tech Stack

- **Nuxt** (Vue 3)
- **TypeScript**
- **Vue**
- **TailwindCSS**
- **Bun** (recommended package manager)

## Project Structure

```text
hq/
├─ app/         # Application layouts, pages, and components
├─ content/     # Blog posts and written content (Markdown)
├─ public/      # Static assets
├─ nuxt.config.ts
├─ package.json
└─ README.md
```

## Getting Started

### Install dependencies

```bash
bun install
```

_(npm, pnpm, or yarn will also work if you prefer)_

### Start the development server

```bash
bun run dev
```

The site will be available at:

```
http://localhost:3000
```

## Build for Production

This is a static site, so:

```bash
bun run generate
```

To preview the production build locally:

```bash
bun run preview
```

## Writing Content

Blog posts live inside the `content/writings` directory and are written in Markdown.
Each post can include front‑matter metadata (title, date, description, etc.), which is used for routing, SEO, and listings.

## License

This project is licensed under the **MIT License**.
Feel free to explore, learn from it, or adapt parts of it for your own projects.

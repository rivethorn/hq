import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    writing: defineCollection({
      type: "page",
      source: "writings/*.md",
      schema: z.object({
        title: z.string(),
        tag: z.string(),
        ttr: z.string(),
        description: z.string(),
        date: z.string(),
      }),
    }),
    content: defineCollection({
      type: "page",
      source: "about.md",
    }),
  },
});

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
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: 'media' }),
        url: z.string().nonempty(),
        story: z.string(),
        date: z.date()
      })
    }),
  },
});

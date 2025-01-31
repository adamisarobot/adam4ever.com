import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: {
        include: 'blog/**',
        exclude:
          process.env.NODE_ENV === 'development' ? undefined : ['drafts/**']
      },
      schema: z.object({
        tags: z.array(z.string()),
        title: z.string(),
        description: z.string(),
        date: z.string()
      })
    })
  }
});

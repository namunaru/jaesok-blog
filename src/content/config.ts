import { defineCollection, z } from 'astro:content';

const review = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
    category: z.string().optional(),
    link: z.string().url(),
    draft: z.boolean().default(false),
  }),
});

const video = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    // 이제 전체 URL을 입력받습니다.
    youtube: z.string().url(), 
    draft: z.boolean().default(false),
  }),
});

export const collections = { review, video };
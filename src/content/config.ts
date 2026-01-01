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
    // 마크다운의 youtube: "주소"를 인식하도록 설정
    youtube: z.string(), 
    draft: z.boolean().default(false),
  }),
});

export const collections = { review, video };
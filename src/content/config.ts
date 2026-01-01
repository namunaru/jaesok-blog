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
    // 사용자님의 md 파일에 적힌 'youtube' 주소를 읽습니다.
    youtube: z.string(), 
    draft: z.boolean().default(false),
  }),
});

export const collections = { review, video };
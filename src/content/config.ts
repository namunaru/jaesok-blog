import { defineCollection, z } from 'astro:content';

const video = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // z.coerce.date()를 써야 "2025-12-28" 문자열을 진짜 날짜로 인식합니다.
    pubDate: z.coerce.date(), 
    youtube: z.string(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

export const collections = { video };
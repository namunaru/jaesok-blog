import { defineCollection, z } from 'astro:content';

const reviewCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    thumbnail: z.string(),
    link: z.string().url(),
    category: z.string().optional(),     // 카테고리 (선택사항)
    tags: z.array(z.string()).optional(), // 태그 배열 (선택사항)
    featured: z.boolean().default(false), // 강조 여부 (기본값 false)
    draft: z.boolean().default(false),    // 초안 여부 (기본값 false)
  }),
});

export const collections = {
  'review': reviewCollection,
};
import { defineCollection, z } from 'astro:content';

const review = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    // 기존 thumbnail 대신 사용자님이 쓰시는 'youtube'를 추가합니다.
    youtube: z.string().optional(), 
    thumbnail: z.string().optional(),
    link: z.string().url(),
    category: z.string().optional(),
  }),
});

const video = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    // 영상 파일에서도 'youtube' 필드를 인식하도록 합니다.
    youtube: z.string(), 
    description: z.string().optional(),
  }),
});

export const collections = { review, video };
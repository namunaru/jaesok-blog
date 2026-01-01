import { defineCollection, z } from 'astro:content';

// 북리뷰 스키마 설정
const review = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(), // 설명이 없을 수도 있음
    category: z.string().optional(),
    thumbnail: z.string().optional(), // 혹시 모를 썸네일 지원
    link: z.string().url(),
    draft: z.boolean().default(false),
  }),
});

// 영상리뷰 스키마 설정 (이 부분이 핵심입니다!)
const video = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    // 마크다운 파일의 'youtube:' 주소를 문자열로 정확히 인식하도록 설정
    youtube: z.string(), 
    draft: z.boolean().default(false),
  }),
});

export const collections = { review, video };
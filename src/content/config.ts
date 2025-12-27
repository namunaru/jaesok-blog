import { defineCollection, z } from 'astro:content';

/* =========================
   Blog Collection
========================= */
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // 제목
    title: z.string(),

    // 요약 (목록용, 없어도 됨)
    description: z.string().optional(),

    // 발행일 (n8n 자동 업로드 대비 optional)
    pubDate: z.coerce.date().optional(),

    // 임시글 여부
    draft: z.boolean().optional().default(false),

    // 홈 통합 정렬용 타입
    type: z.literal('blog').default('blog'),
  }),
});

/* =========================
   Video Collection
========================= */
const video = defineCollection({
  type: 'content',
  schema: z.object({
    // 영상 제목
    title: z.string(),

    // 유튜브 URL (핵심)
    videoUrl: z.string().url(),

    // 영상 설명
    description: z.string().optional(),

    // 업로드 날짜
    pubDate: z.coerce.date().optional(),

    // 임시 비공개
    draft: z.boolean().optional().default(false),

    // 홈 통합 정렬용 타입
    type: z.literal('video').default('video'),
  }),
});

/* =========================
   Export Collections
========================= */
export const collections = {
  blog,
  video,
};

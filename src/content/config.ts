import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // 글 제목
    title: z.string(),

    // 글 요약 (없어도 됨)
    description: z.string().optional(),

    // 발행일 (없어도 허용 → 목록에서 안전하게 처리)
    pubDate: z.coerce.date().optional(),

    // 임시글 여부 (기본 false)
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };

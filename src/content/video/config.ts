import { defineCollection, z } from 'astro:content';

/**
 * video 컬렉션
 * - n8n이 유튜브에서 자동으로 md 파일을 올릴 때
 * - 이 스키마를 기준으로 검증됨
 */
const video = defineCollection({
  type: 'content',
  schema: z.object({
    /** 영상 제목 */
    title: z.string(),

    /** 게시 날짜 (유튜브 업로드 날짜 or 자동 생성) */
    pubDate: z.coerce.date(),

    /** 유튜브 원본 링크 */
    youtube: z.string().url(),

    /** 홈/목록 노출 여부 (기본 false 권장) */
    draft: z.boolean().optional().default(false),

    /** (선택) 영상 길이, 나중에 써도 됨 */
    duration: z.string().optional(),

    /** (선택) 썸네일 URL – 나중에 확장용 */
    thumbnail: z.string().url().optional(),
  }),
});

export const collections = {
  video,
};

import { notion, DATABASE_ID } from './client';

export interface NotionPost {
  pageId: string;
  title: string;
  slug: string;
  date: string;
  cover?: string | null;
}

/* =========================
   Published posts 목록
========================= */
export async function getPublishedPosts(): Promise<NotionPost[]> {
  const res = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
        {
          property: 'status',
          select: { equals: 'published' },
        },
        {
          property: 'category',
          select: { equals: '북리뷰' },
        },
      ],
    },
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  });

  return res.results.map(mapPageToPost);
}

/* =========================
   slug로 단일 글 조회
========================= */
export async function getPostBySlug(
  slug: string
): Promise<NotionPost | null> {
  const res = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
        {
          property: 'slug',
          rich_text: { equals: slug },
        },
        {
          property: 'status',
          select: { equals: 'published' },
        },
      ],
    },
    page_size: 1,
  });

  if (res.results.length === 0) return null;
  return mapPageToPost(res.results[0]);
}

/* =========================
   내부 매핑
========================= */
function mapPageToPost(page: any): NotionPost {
  const props = page.properties;

  return {
    pageId: page.id,
    title: props.title.title[0]?.plain_text ?? '',
    slug: props.slug.rich_text[0]?.plain_text ?? '',
    date: props.date.date?.start ?? '',
    cover: page.cover?.external?.url
      ?? page.cover?.file?.url
      ?? null,
  };
}


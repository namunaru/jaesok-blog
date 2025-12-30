import { Client } from '@notionhq/client';

// 1. 여기서 직접 클라이언트를 생성합니다.
export const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN,
});

export const DATABASE_ID = import.meta.env.NOTION_DATABASE_ID;

// 2. 데이터 가져오기 함수
export async function getPublishedPosts() {
  if (!DATABASE_ID) return [];
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: 'Status', status: { equals: 'Published' } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });
    return response.results;
  } catch (e) {
    console.error("노션 데이터를 불러오는 중 에러 발생:", e);
    return [];
  }
}

// 3. 데이터 매핑 함수 (날짜 에러 방지 포함)
export function mapNotionPageToSchema(page: any) {
  const p = page.properties;
  const rawDate = p.Date?.date?.start || page.created_time;
  
  return {
    id: page.id,
    title: p.Title?.title[0]?.plain_text || '제목 없음',
    pubDate: new Date(rawDate),
    youtube: p.YouTube?.url || '',
    description: p.Description?.rich_text[0]?.plain_text || '',
  };
}
import { Client } from '@notionhq/client';

const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });
const databaseId = import.meta.env.NOTION_DATABASE_ID;

export async function getPublishedPosts() {
  console.log("--- DEBUG START ---");
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      // 필터를 일시적으로 제거하여 모든 데이터를 가져옵니다.
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    console.log("노션에서 가져온 실제 데이터 개수:", response.results.length);
    return response.results;
  } catch (error) {
    console.error("노션 연결 중 에러:", error);
    return [];
  }
}

export function mapNotionPageToSchema(page: any) {
  try {
    return {
      id: page.id,
      title: page.properties.Title?.title[0]?.plain_text || "제목 없음",
      pubDate: new Date(page.properties.Date?.date?.start || Date.now()),
    };
  } catch (err) {
    return null;
  }
}

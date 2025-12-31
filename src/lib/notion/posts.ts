import { Client } from '@notionhq/client';

// Cloudflare 환경변수에서 토큰과 ID를 가져옵니다.
const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });
const databaseId = import.meta.env.NOTION_DATABASE_ID;

export async function getPublishedPosts() {
  console.log("--- NOTION DEBUG START ---");
  console.log("Using Database ID:", databaseId);

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        status: {
          equals: 'Published', // 이 값이 노션의 'Status' 열과 정확히 일치해야 합니다.
        },
      },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    // 핵심 디버깅 로그: 노션이 돌려준 데이터의 개수를 확인합니다.
    console.log("노션 응답 성공! 검색된 글 개수:", response.results.length);
    
    if (response.results.length === 0) {
      console.warn("경고: 필터 조건(Status=Published)에 맞는 글이 하나도 없습니다.");
    }

    return response.results;
  } catch (error) {
    console.error("노션 API 호출 중 치명적 에러 발생:", error);
    return [];
  } finally {
    console.log("--- NOTION DEBUG END ---");
  }
}

export function mapNotionPageToSchema(page: any) {
  // 데이터 구조 변환 시 로그 출력 (데이터가 있는데 화면에 안 나올 경우 대비)
  try {
    return {
      id: page.id,
      title: page.properties.Title?.title[0]?.plain_text || '제목 없음',
      pubDate: new Date(page.properties.Date?.date?.start || Date.now()),
      description: page.properties.Description?.rich_text[0]?.plain_text || '',
    };
  } catch (err) {
    console.error("데이터 변환(Mapping) 중 에러 발생:", err);
    return null;
  }
}
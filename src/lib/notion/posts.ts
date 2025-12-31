import { Client } from '@notionhq/client';

/**
 * 노션에서 'Published' 상태인 모든 글을 가져오는 함수
 */
export async function getPublishedPosts() {
  // Cloudflare Pages의 환경변수를 읽어오는 가장 안전한 방식입니다.
  const token = import.meta.env.NOTION_TOKEN || process.env.NOTION_TOKEN;
  const databaseId = import.meta.env.NOTION_DATABASE_ID || process.env.NOTION_DATABASE_ID;

  // 디버깅을 위한 서버 로그 (Cloudflare 배포 로그에서 확인 가능)
  console.log("--- NOTION DEBUG START ---");
  console.log("Target Database ID:", databaseId);

  if (!token || !databaseId) {
    console.error("에러: NOTION_TOKEN 또는 DATABASE_ID 환경변수가 설정되지 않았습니다.");
    return [];
  }

  const notion = new Client({ auth: token });

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status', // 노션의 속성 이름과 일치해야 함
        status: {
          equals: 'Published', // 노션의 상태값과 일치해야 함
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    console.log("노션 응답 성공! 검색된 글 개수:", response.results.length);
    return response.results;
  } catch (error) {
    console.error("노션 데이터 쿼리 중 오류 발생:", error);
    return [];
  }
}

/**
 * 노션 원본 데이터를 홈페이지 형식에 맞게 변환하는 함수
 */
export function mapNotionPageToSchema(page: any) {
  try {
    const props = page.properties;
    
    // 노션 DB의 'Title', 'Date' 속성 이름을 정확히 참조합니다.
    return {
      id: page.id,
      title: props.Title?.title[0]?.plain_text || "제목 없음",
      pubDate: new Date(props.Date?.date?.start || Date.now()),
      description: props.Description?.rich_text[0]?.plain_text || "",
    };
  } catch (err) {
    console.error("데이터 매핑 중 오류:", err);
    return null;
  }
}

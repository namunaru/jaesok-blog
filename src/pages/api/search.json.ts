import { getCollection } from 'astro:content';

export async function GET() {
  const allReviews = await getCollection('review');
  const allVideos = await getCollection('video');

  // 검색에 필요한 최소한의 데이터만 추출하여 JSON 베이로드 크기 최적화
  const searchIndex = [
    ...allReviews
      .filter((post) => !post.data.draft)
      .map((post) => ({
        id: post.slug,
        type: 'review',
        title: post.data.title,
        description: post.data.description || '',
        category: post.data.category || '',
        url: post.data.link || `/review/${post.slug}`,
        date: post.data.pubDate,
      })),
    ...allVideos.map((video) => ({
      id: video.slug,
      type: 'video',
      title: video.data.title,
      description: '', // 영상에는 description이 없을 수 있음
      category: 'Video',
      url: `/video/${video.slug}`,
      date: video.data.pubDate,
    })),
  ];

  // 최신순 정렬
  searchIndex.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // 캐싱 설정 (변경이 자주 안 일어나는 경우)
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

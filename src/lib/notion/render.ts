import { notion } from './client';

/* =========================
   Notion block → HTML
========================= */
export async function renderNotionContent(pageId: string): Promise<string> {
  const blocks = await fetchAllBlocks(pageId);
  return blocks.map(renderBlock).join('\n');
}

/* =========================
   블록 전체 조회
========================= */
async function fetchAllBlocks(blockId: string, cursor?: string) {
  const res = await notion.blocks.children.list({
    block_id: blockId,
    start_cursor: cursor,
  });

  const results = res.results as any[];

  if (res.has_more && res.next_cursor) {
    return results.concat(
      await fetchAllBlocks(blockId, res.next_cursor)
    );
  }

  return results;
}

/* =========================
   블록 렌더러
========================= */
function renderBlock(block: any): string {
  const { type } = block;

  switch (type) {
    case 'paragraph':
      return `<p>${richText(block.paragraph.rich_text)}</p>`;

    case 'heading_1':
      return `<h1>${richText(block.heading_1.rich_text)}</h1>`;

    case 'heading_2':
      return `<h2>${richText(block.heading_2.rich_text)}</h2>`;

    case 'heading_3':
      return `<h3>${richText(block.heading_3.rich_text)}</h3>`;

    case 'image': {
      const src =
        block.image.external?.url ?? block.image.file?.url;
      return src ? `<img src="${src}" />` : '';
    }

    case 'divider':
      return `<hr />`;

    case 'bulleted_list_item':
      return `<ul><li>${richText(block.bulleted_list_item.rich_text)}</li></ul>`;

    case 'numbered_list_item':
      return `<ol><li>${richText(block.numbered_list_item.rich_text)}</li></ol>`;

    case 'quote':
      return `<blockquote>${richText(block.quote.rich_text)}</blockquote>`;

    default:
      return '';
  }
}

/* =========================
   Rich text 처리
========================= */
function richText(texts: any[]): string {
  return texts
    .map((t) => {
      let text = t.plain_text;
      if (t.annotations.bold) text = `<strong>${text}</strong>`;
      if (t.annotations.italic) text = `<em>${text}</em>`;
      if (t.annotations.underline) text = `<u>${text}</u>`;
      if (t.annotations.strikethrough) text = `<s>${text}</s>`;
      if (t.href) text = `<a href="${t.href}">${text}</a>`;
      return text;
    })
    .join('');
}


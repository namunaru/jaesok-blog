/**
 * Notion의 리치 텍스트 배열을 HTML로 변환합니다.
 */
export function renderRichText(richText: any[]): string {
  return richText
    .map((text) => {
      const { annotations, text: content, href } = text;
      let html = content.content;

      if (annotations.bold) html = `<strong>${html}</strong>`;
      if (annotations.italic) html = `<em>${html}</em>`;
      if (annotations.strikethrough) html = `<del>${html}</del>`;
      if (annotations.underline) html = `<u>${html}</u>`;
      if (annotations.code) html = `<code>${html}</code>`;
      if (annotations.color !== 'default') {
        html = `<span style="color: ${annotations.color}">${html}</span>`;
      }
      if (href) html = `<a href="${href}">${html}</a>`;

      return html;
    })
    .join('');
}

/**
 * Notion 블록들을 간단한 HTML로 변환합니다. (기본적인 블록 타입 지원)
 */
export function renderBlocks(blocks: any[]): string {
  return blocks
    .map((block) => {
      const type = block.type;
      const value = block[type];

      switch (type) {
        case 'paragraph':
          return `<p>${renderRichText(value.rich_text)}</p>`;
        case 'heading_1':
          return `<h1>${renderRichText(value.rich_text)}</h1>`;
        case 'heading_2':
          return `<h2>${renderRichText(value.rich_text)}</h2>`;
        case 'heading_3':
          return `<h3>${renderRichText(value.rich_text)}</h3>`;
        case 'bulleted_list_item':
          return `<li>${renderRichText(value.rich_text)}</li>`;
        case 'numbered_list_item':
          return `<li>${renderRichText(value.rich_text)}</li>`;
        case 'code':
          return `<pre><code>${renderRichText(value.rich_text)}</code></pre>`;
        case 'divider':
          return `<hr />`;
        default:
          return ``;
      }
    })
    .join('');
}
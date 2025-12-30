import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server', // Notion API 실시간 연동을 위해 필수
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
});
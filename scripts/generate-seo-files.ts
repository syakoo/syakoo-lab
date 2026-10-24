import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { readGameContents } from "../src/contents/games/reader";
import { readWebappContents } from "../src/contents/webapps/reader";
import { readWritingContents } from "../src/contents/writings/reader";

const PUBLIC_DIR = resolve(import.meta.dirname, "../public");
const basePath = "https://syakoo-lab.com";

const robots = `User-Agent: *
Allow: /

# AI クローラーには画像・アセットのみブロック
${[
  "GPTBot", // OpenAI
  "ChatGPT-User", // OpenAI (ChatGPT browsing)
  "Google-Extended", // Google AI
  "CCBot", // Common Crawl
  "anthropic-ai", // Anthropic
  "Claude-Web", // Anthropic
  "Bytespider", // ByteDance
  "cohere-ai", // Cohere
]
  .map((agent) => `User-Agent: ${agent}`)
  .join("\n")}
Disallow: /img/
Disallow: /assets/

Sitemap: ${basePath}/sitemap.xml
`;

const toLastmod = (date: string | Date) => new Date(date).toISOString();

const buildSitemap = async () => {
  const writingContents = await readWritingContents();
  // NOTE: Art は二次創作イラストを含むため、意図的にサイトマップから除外している
  const gameContents = await readGameContents();
  const webappContents = readWebappContents();

  const contentEntries = [
    ...writingContents
      .filter(({ frontMatter }) => !frontMatter.noindex)
      .map(({ frontMatter }) => ({
        url: `${basePath}/writings/${frontMatter.id}`,
        lastModified: frontMatter.updated ?? frontMatter.published,
      })),
    ...gameContents
      .filter(({ frontMatter }) => !frontMatter.noindex)
      .map(({ frontMatter }) => ({
        url: `${basePath}/creations/${frontMatter.id}`,
        lastModified: frontMatter.updated ?? frontMatter.published,
      })),
    ...webappContents.map((webapp) => ({
      url: `${basePath}/creations/${webapp.id}`,
      lastModified: webapp.releasedAt,
    })),
  ];

  // NOTE: ビルド時刻だと毎回変わるため、最新のコンテンツ日付をトップページの lastmod とする
  const newestLastModified = contentEntries
    .map(({ lastModified }) => new Date(lastModified).getTime())
    .reduce((max, time) => Math.max(max, time), 0);

  const entries = [
    { url: basePath, lastModified: new Date(newestLastModified) },
    ...contentEntries,
  ];

  const urls = entries
    .map(
      ({ url, lastModified }) =>
        `  <url>\n    <loc>${url}</loc>\n    <lastmod>${toLastmod(lastModified)}</lastmod>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

void (async () => {
  console.log("[start] generate robots.txt / sitemap.xml");
  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(resolve(PUBLIC_DIR, "robots.txt"), robots);
  await writeFile(resolve(PUBLIC_DIR, "sitemap.xml"), await buildSitemap());
  console.log("[end] generate robots.txt / sitemap.xml");
})();

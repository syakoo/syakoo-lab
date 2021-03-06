import { ArticleInfo } from '@/types'
import { readArticlesManifest } from './articles'

// ___________
//
const SITE_DOMAIN = 'https://syakoo-lab.com'

// ___________
//
export const generateSitemapXML = async (articleInfos?: ArticleInfo[]) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  const posts = articleInfos || (await readArticlesManifest()).posts
  posts
    .filter(
      (post) => post.siteName === "Syakoo's Lab" && !post.tags.includes('雑記')
    )
    .forEach((post) => {
      xml += `
    <url>
      <loc>${SITE_DOMAIN}${post.link}</loc>
      <lastmod>${post.updated || post.published}</lastmod>
    </url>
    `
    })

  xml += `</urlset>`
  return xml
}

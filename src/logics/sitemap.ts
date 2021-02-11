import { readArticlesManifest } from './articles'

// ___________
//
const SITE_DOMAIN = 'https://syakoo-lab.com'

// ___________
//
export const generateSitemapXML = async () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  const { posts } = await readArticlesManifest()
  posts
    .filter((post) => post.siteName === "Syakoo's Lab")
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

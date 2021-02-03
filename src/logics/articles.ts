import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'

import type { ArticleInfo } from '@/types'
import { readFile, getDirs } from './fileSystem'

// ___________
//
export const readArticle = async (dirName: string) => {
  const rowData = await readFile('articles', `${dirName}/index.mdx`)
  const { data, content } = matter(rowData)

  return { data, content }
}

export const readArticlesManifest = async () => {
  const { posts }: { posts: ArticleInfo[] } = await readFile(
    'articles',
    'manifest.json'
  ).then((data) => JSON.parse(data))

  return posts
}

export const collectArticlesInfo = async () => {
  const articleIds = await getDirs('articles')
  const articlesInfo: ArticleInfo[] = await Promise.all(
    articleIds.map(async (id) => {
      const { data } = await readArticle(id)
      const articleInfo: ArticleInfo = {
        title: data.title || '',
        published: data.published,
        updated: data.published || '',
        id,
      }

      return articleInfo
    })
  )

  return articlesInfo
}

// ___________
//
export const convertMdx2Source = async (content: string) => {
  const result = await renderToString(content, {})

  return result
}

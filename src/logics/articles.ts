import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'

import { readFile, getDirs } from './fileSystem'
import type { ArticleInfo } from '@/types'

// ___________
//
export const readArticle = async (dirName: string) => {
  const rowData = await readFile('articles', `${dirName}/index.mdx`)
  const { data, content } = matter(rowData)

  return { data, content }
}

export const readArticlesManifest = async () => {
  const { posts } = await readFile('articles', 'manifest.json').then((data) =>
    JSON.parse(data)
  )
  const result: ArticleInfo[] = posts.map((post: any) => ({
    title: post.title || '',
    published: post.published,
    updated: post.updated || '',
    id: post.id,
  }))

  return result
}

export const collectArticlesInfo = async () => {
  const articleIds = await getDirs('articles')
  const articlesInfo: ArticleInfo[] = []

  for (const id of articleIds) {
    const { data } = await readArticle(id)
    const articleInfo: ArticleInfo = {
      title: data.title || '',
      published: data.published,
      updated: data.published || '',
      id,
    }

    articlesInfo.push(articleInfo)
  }

  return articlesInfo
}

// ___________
//
export const convertMdx2Source = async (content: string) => {
  const result = await renderToString(content, {})

  return result
}

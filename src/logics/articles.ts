import matter from 'gray-matter'

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
      const articleInfo = {
        ...data,
        id,
      } as ArticleInfo

      return articleInfo
    })
  )

  return articlesInfo
}

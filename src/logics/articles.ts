import matter from 'gray-matter'

import type { ArticleInfo } from '@/types'
import { readFile, getDirs } from './utils/fileSystem'
import { convertMdx2Source } from './utils/mdx'

// ___________
//
export const readArticle = async (articleId: string) => {
  const rowData = await readFile('articles', `${articleId}/index.mdx`)
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

// ___________
//
export const getArticleSource = async (articleId: string) => {
  const { content } = await readArticle(articleId)
  const source = await convertMdx2Source(content)

  return source
}

export const getArticleInfoFromManifest = async (articleId: string) => {
  const articleInfos = await readArticlesManifest()
  const result = articleInfos.find((article) => article.id === articleId)

  return result
}

export const collectArticlesInfo = async () => {
  const articleIds = await getDirs('articles')
  const articlesInfo: ArticleInfo[] = await Promise.all(
    articleIds.map(async (id: string) => {
      const { data } = await readArticle(id)
      const articleInfo = {
        ...data,
        id,
      } as ArticleInfo

      return articleInfo
    })
  )
  const result = articlesInfo.sort(
    (art1, art2) =>
      new Date(art2.published).getTime() - new Date(art1.published).getTime()
  )

  return result
}

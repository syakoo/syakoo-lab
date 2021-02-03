import { NextPage } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import type { Article } from '@/types'

import {
  readArticlesManifest,
  readArticle,
  convertMdx2Source,
} from '@/logics/articles'

// ___________
//
type ArticlesPageProps = {
  articles: Article[]
}

// ___________
//
const ArticlesPage: NextPage<ArticlesPageProps> = ({ articles }) => {
  return (
    <SingleLayout>
      <h2>Articles Page</h2>
      {articles.map((article) => (
        <p key={article.id}>{article.title}</p>
      ))}
    </SingleLayout>
  )
}

// ___________
//
export const getStaticProps = async () => {
  const posts = await readArticlesManifest()
  const articles: Article[] = await Promise.all(
    posts.map(async (post) => {
      const { content } = await readArticle(`${post.id}`)
      const source = await convertMdx2Source(content)
      return { ...post, source }
    })
  )

  return { props: { articles } }
}

export default ArticlesPage

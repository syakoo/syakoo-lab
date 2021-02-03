import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import type { Article } from '@/types'
import { readArticlesManifest, readArticle } from '@/logics/articles'
import { convertMdx2Source } from '@/logics/mdx'

// ___________
//
type ArticlePageProps = {
  article: Article
}

// ___________
//
const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  return (
    <SingleLayout>
      <h1>{article.title}</h1>
      <MarkdownRenderer source={article.source} />
    </SingleLayout>
  )
}

// ___________
//
export const getStaticPaths: GetStaticPaths = async () => {
  const articleInfos = await readArticlesManifest()
  const paths = articleInfos.map((info) => `/articles/${info.id}`)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  params,
}) => {
  const aritlceId = params?.articleId as string
  const { data, content } = await readArticle(aritlceId)
  const source = await convertMdx2Source(content)
  const article = {
    ...data,
    source,
  } as Article

  return { props: { article } }
}

export default ArticlePage

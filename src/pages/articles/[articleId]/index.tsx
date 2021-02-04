import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { ArticleView } from '@/components/templates/ArticleView'
import type { Article } from '@/types'
import {
  readArticlesManifest,
  getArticleInfoFromManifest,
  getArticleSource,
} from '@/logics/articles'

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
      <ArticleView article={article} />
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
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  params,
}) => {
  const articleId = params?.articleId as string
  const articleInfo = await getArticleInfoFromManifest(articleId)
  const source = await getArticleSource(articleId)

  const article = {
    ...articleInfo,
    source,
  } as Article

  return { props: { article } }
}

export default ArticlePage

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { ArticleView } from '@/components/templates/ArticleView'
import type { Article, AboutMeInfo, Source } from '@/types'
import {
  readArticlesManifest,
  getArticleInfoFromManifest,
  getArticleSource,
} from '@/logics/articles'
import { getAboutMeInfo, getAboutMeShortSource } from '@/logics/aboutme'

// ___________
//
type ArticlePageProps = {
  article: Article
  aboutme: { info: AboutMeInfo; source: Source }
}

// ___________
//
const ArticlePage: NextPage<ArticlePageProps> = ({ article, aboutme }) => {
  return (
    <SingleLayout>
      <ArticleView article={article} aboutme={aboutme} />
    </SingleLayout>
  )
}

// ___________
//
export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await readArticlesManifest()
  const paths = posts.map((info) => `/articles/${info.id}`)

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

  const aboutmeInfo = await getAboutMeInfo()
  const aboutmeSource = await getAboutMeShortSource()

  return {
    props: { article, aboutme: { info: aboutmeInfo, source: aboutmeSource } },
  }
}

export default ArticlePage

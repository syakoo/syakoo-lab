import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import {
  DoubleLayout,
  MainBlock,
  SubBlock,
} from '@/components/layouts/DoubleLayout'
import { ArticleView } from '@/components/templates/ArticleView'
import { PreviewArt } from '@/components/organisms/PreviewArt'
import type { Article, AboutMeInfo, Source, ArtInfo } from '@/types'
import {
  readArticlesManifest,
  getArticleInfoFromManifest,
  getArticleSource,
} from '@/logics/articles'
import { getRecentlyArts } from '@/logics/arts'
import { getAboutMeInfo, getAboutMeShortSource } from '@/logics/aboutme'

// ___________
//
type ArticlePageProps = {
  article: Article
  aboutme: { info: AboutMeInfo; source: Source }
  artInfos: ArtInfo[]
}

// ___________
//
const ArticlePage: NextPage<ArticlePageProps> = ({
  article,
  aboutme,
  artInfos,
}) => {
  return (
    <DoubleLayout>
      <MainBlock>
        <ArticleView article={article} aboutme={aboutme} />
      </MainBlock>
      <SubBlock>
        <PreviewArt artInfos={artInfos} />
      </SubBlock>
    </DoubleLayout>
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
  const artInfos = await getRecentlyArts()

  return {
    props: {
      article,
      aboutme: { info: aboutmeInfo, source: aboutmeSource },
      artInfos,
    },
  }
}

export default ArticlePage

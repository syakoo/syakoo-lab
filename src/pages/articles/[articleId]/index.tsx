import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import {
  DoubleLayout,
  MainBlock,
  SubBlock,
  StickyBlock,
} from '@/components/layouts/DoubleLayout'
import { CustomHead } from '@/components/atoms/CustomHead'
import { ArticleView } from '@/components/templates/ArticleView'
import { TOC } from '@/components/templates/TOC'
import { RelatedArticleListBlock } from '@/components/templates/RelatedArticleListBlock'
import { PreviewArt } from '@/components/organisms/PreviewArt'
import type {
  Article,
  AboutMeInfo,
  Source,
  ArtInfo,
  ArticleInfo,
} from '@/types'
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
  relatedArticles: ArticleInfo[]
}

// ___________
//
const ArticlePage: NextPage<ArticlePageProps> = ({
  article,
  aboutme,
  artInfos,
  relatedArticles,
}) => {
  return (
    <>
      <CustomHead url={`articles/${article.id}`} title={article.title} />
      <DoubleLayout>
        <MainBlock>
          <ArticleView article={article} aboutme={aboutme} />
          <RelatedArticleListBlock relatedArticles={relatedArticles} />
        </MainBlock>
        <SubBlock>
          <StickyBlock>
            <PreviewArt artInfos={artInfos} />
            <TOC />
          </StickyBlock>
        </SubBlock>
      </DoubleLayout>
    </>
  )
}

// ___________
//
export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await readArticlesManifest()
  const paths = posts
    .filter((p) => p.siteName === "Syakoo's Lab")
    .map((info) => `/articles/${info.id}`)

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

  const { posts } = await readArticlesManifest()
  const relatedArticles = posts
    .filter((a) => a.tags.includes(article.tags[0]) && a.id !== article.id)
    .slice(0, 5)

  return {
    props: {
      article,
      aboutme: { info: aboutmeInfo, source: aboutmeSource },
      artInfos,
      relatedArticles,
    },
  }
}

export default ArticlePage

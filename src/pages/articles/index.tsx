import { NextPage, GetStaticProps } from 'next'

import { DoubleLayout } from '@/components/layouts/DoubleLayout'
import { ArticleLinkList } from '@/components/templates/ArticleLinkList'
import { PreviewArt } from '@/components/organisms/PreviewArt'
import { readArticlesManifest } from '@/logics/articles'
import { getRecentlyArts } from '@/logics/arts'
import type { ArticleInfo, ArtInfo } from '@/types'

// ___________
//
type ArticlesPageProps = {
  articleInfos: ArticleInfo[]
  artInfos: ArtInfo[]
}

// ___________
//
const Side = ({ artInfos }: { artInfos: ArtInfo[] }) => (
  <div>
    <PreviewArt artInfos={artInfos} />
  </div>
)

const ArticlesPage: NextPage<ArticlesPageProps> = ({
  articleInfos,
  artInfos,
}) => {
  return (
    <DoubleLayout
      mainComponent={<ArticleLinkList articles={articleInfos} />}
      subComponent={<Side artInfos={artInfos} />}
    />
  )
}

// ___________
//
export const getStaticProps: GetStaticProps<ArticlesPageProps> = async () => {
  const articleInfos = await readArticlesManifest()
  const artInfos = await getRecentlyArts()

  return { props: { articleInfos, artInfos } }
}

export default ArticlesPage

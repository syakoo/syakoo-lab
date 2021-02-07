import { NextPage, GetStaticProps } from 'next'

import {
  DoubleLayout,
  MainBlock,
  SubBlock,
} from '@/components/layouts/DoubleLayout'
import { ArticleLinkList } from '@/components/templates/ArticleLinkList'
import { PreviewArt } from '@/components/organisms/PreviewArt'
import { TagListCard } from '@/components/organisms/TagListCard'
import { readArticlesManifest } from '@/logics/articles'
import { getRecentlyArts } from '@/logics/arts'
import type { ArticleInfo, ArtInfo } from '@/types'

// ___________
//
type ArticlesPageProps = {
  articleInfos: ArticleInfo[]
  artInfos: ArtInfo[]
  allTags: string[]
}

// ___________
//
const ArticlesPage: NextPage<ArticlesPageProps> = ({
  articleInfos,
  artInfos,
  allTags,
}) => {
  return (
    <DoubleLayout>
      <MainBlock>
        <ArticleLinkList articles={articleInfos} />
      </MainBlock>
      <SubBlock>
        <PreviewArt artInfos={artInfos} />
        <TagListCard tags={allTags} />
      </SubBlock>
    </DoubleLayout>
  )
}

// ___________
//
export const getStaticProps: GetStaticProps<ArticlesPageProps> = async () => {
  const { posts, tags } = await readArticlesManifest()
  const artInfos = await getRecentlyArts()

  return { props: { articleInfos: posts, artInfos, allTags: tags } }
}

export default ArticlesPage

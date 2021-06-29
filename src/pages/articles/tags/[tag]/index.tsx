import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import {
  DoubleLayout,
  MainBlock,
  SubBlock,
} from '@/components/layouts/DoubleLayout'
import { CustomHead } from '@/components/atoms/CustomHead'
import { ArticleLinkList } from '@/components/templates/ArticleLinkList'
import { PreviewArt } from '@/components/organisms/PreviewArt'
import { TagListCard } from '@/components/organisms/TagListCard'
import { readArticlesManifest } from '@/logics/articles'
import { getRecentlyArts } from '@/logics/arts'
import type { ArticleInfo, ArtInfo } from '@/types'

// ___________
//
type ArticlesFilteredTagPageProps = {
  articleInfos: ArticleInfo[]
  artInfos: ArtInfo[]
  allTags: string[]
  selectedTag: string
}

// ___________
//
const ArticlesFilteredTagPage: NextPage<ArticlesFilteredTagPageProps> = ({
  articleInfos,
  artInfos,
  allTags,
  selectedTag,
}) => {
  return (
    <>
      <CustomHead
        url={`articles/tags/${selectedTag}`}
        title={`記事一覧#${selectedTag}`}
        noIndex
      />
      <DoubleLayout>
        <MainBlock>
          <ArticleLinkList articles={articleInfos} selectedTag={selectedTag} />
        </MainBlock>
        <SubBlock>
          <PreviewArt artInfos={artInfos} />
          <TagListCard tags={allTags} />
        </SubBlock>
      </DoubleLayout>
    </>
  )
}

// ___________
//
export const getStaticPaths: GetStaticPaths = async () => {
  const { tags } = await readArticlesManifest()
  const paths = tags.map((tag) => `/articles/tags/${tag}`)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ArticlesFilteredTagPageProps> =
  async ({ params }) => {
    const tag = params?.tag as string
    const { posts, tags } = await readArticlesManifest()
    const filteredPosts = posts.filter((post) => post.tags.includes(tag))
    const artInfos = await getRecentlyArts()

    return {
      props: {
        articleInfos: filteredPosts,
        artInfos,
        allTags: tags,
        selectedTag: tag,
      },
    }
  }

export default ArticlesFilteredTagPage

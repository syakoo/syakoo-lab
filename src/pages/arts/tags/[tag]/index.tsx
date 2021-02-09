import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { CustomHead } from '@/components/atoms/CustomHead'
import { ArtLinkList } from '@/components/templates/ArtLinkList'
import { readArtsManifest } from '@/logics/arts'
import type { ArtInfo } from '@/types'

// ___________
//
type ArtsFilteredTagPageProps = {
  artInfos: ArtInfo[]
  selectedTag: string
}

// ___________
//
const ArtsFilteredTagPage: NextPage<ArtsFilteredTagPageProps> = ({
  artInfos,
  selectedTag,
}) => (
  <SingleLayout isLarge>
    <CustomHead
      url={`/arts/tags/${selectedTag}`}
      title={`イラスト一覧#${selectedTag}`}
    />
    <ArtLinkList artInfos={artInfos} selectedTag={selectedTag} />
  </SingleLayout>
)

// ___________
//
export const getStaticPaths: GetStaticPaths = async () => {
  const { tags } = await readArtsManifest()
  const paths = tags.map((tag) => `/arts/tags/${tag}`)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ArtsFilteredTagPageProps> = async ({
  params,
}) => {
  const tag = params?.tag as string
  const { posts } = await readArtsManifest()
  const filteredPosts = posts.filter((post) => post.tags.includes(tag))

  return { props: { artInfos: filteredPosts, selectedTag: tag } }
}

export default ArtsFilteredTagPage

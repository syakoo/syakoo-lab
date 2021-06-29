import { NextPage, GetStaticProps } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { CustomHead } from '@/components/atoms/CustomHead'
import { ArtLinkList } from '@/components/templates/ArtLinkList'
import { readArtsManifest } from '@/logics/arts'
import type { ArtInfo } from '@/types'

// ___________
//
type ArtsPageProps = {
  artInfos: ArtInfo[]
}

// ___________
//
const ArtsPage: NextPage<ArtsPageProps> = ({ artInfos }) => (
  <SingleLayout isLarge>
    <CustomHead url="/arts" title="イラスト一覧" noIndex />
    <ArtLinkList artInfos={artInfos} />
  </SingleLayout>
)

// ___________
//
export const getStaticProps: GetStaticProps<ArtsPageProps> = async () => {
  const { posts } = await readArtsManifest()

  return { props: { artInfos: posts } }
}

export default ArtsPage

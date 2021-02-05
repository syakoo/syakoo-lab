import { NextPage, GetStaticProps } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
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
    <ArtLinkList artInfos={artInfos} />
  </SingleLayout>
)

// ___________
//
export const getStaticProps: GetStaticProps<ArtsPageProps> = async () => {
  const artInfos = await readArtsManifest()

  return { props: { artInfos } }
}

export default ArtsPage

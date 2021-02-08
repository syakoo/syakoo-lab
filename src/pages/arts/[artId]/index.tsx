import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { ArtView } from '@/components/templates/ArtView'
import type { Art } from '@/types'
import {
  readArtsManifest,
  getArtInfoFromManifest,
  getArtDescriptionSource,
} from '@/logics/arts'

// ___________
//
type ArtPageProps = {
  art: Art
}

// ___________
//
const ArtPage: NextPage<ArtPageProps> = ({ art }) => {
  return (
    <SingleLayout>
      <ArtView art={art} />
    </SingleLayout>
  )
}

// ___________
//
export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await readArtsManifest()
  const paths = posts.map((info) => `/arts/${info.id}`)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ArtPageProps> = async ({
  params,
}) => {
  const artId = params?.artId as string
  const artInfo = await getArtInfoFromManifest(artId)
  const source = await getArtDescriptionSource(artId)

  const art = {
    ...artInfo,
    descriptionSource: source,
  } as Art

  return { props: { art } }
}

export default ArtPage

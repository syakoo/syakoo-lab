import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
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
      <div>
        <Image
          src={art.imgUrl}
          alt={art.title}
          width={art.size.width}
          height={art.size.height}
        />
      </div>
      <h1>{art.title}</h1>
      <MarkdownRenderer source={art.descriptionSource} />
    </SingleLayout>
  )
}

// ___________
//
export const getStaticPaths: GetStaticPaths = async () => {
  const artInfos = await readArtsManifest()
  const paths = artInfos.map((info) => `/arts/${info.id}`)

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

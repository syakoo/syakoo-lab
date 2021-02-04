import { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { SingleLayout } from '@/components/layouts/SingleLayout'
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
  <SingleLayout>
    <h2>Arts Page</h2>
    {artInfos.map((art) => (
      <Link key={art.id} href={`/arts/${art.id}`}>
        <Image
          src={art.imgUrl}
          alt={art.title}
          width={art.size.width}
          height={art.size.height}
        />
      </Link>
    ))}
  </SingleLayout>
)

// ___________
//
export const getStaticProps: GetStaticProps<ArtsPageProps> = async () => {
  const artInfos = await readArtsManifest()

  return { props: { artInfos } }
}

export default ArtsPage

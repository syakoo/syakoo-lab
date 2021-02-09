import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Card } from '@/components/atoms/Card'
import { reSize as reSizeImg } from '@/logics/utils/img'
import type { ArtInfo } from '@/types'

import styles from './styles.module.scss'

// ___________
//
interface ArtLinkListProps {
  artInfos: ArtInfo[]
  selectedTag?: string
}

// ___________
//
const ArtLinkList: React.VFC<ArtLinkListProps> = ({
  artInfos,
  selectedTag,
}) => {
  const reSize = (size: { width: number; height: number }) => {
    return reSizeImg(size, { width: 320, height: 240 })
  }
  const title = selectedTag ? `Arts #${selectedTag}` : 'Arts'

  return (
    <Card title={title}>
      <ul className={styles.artList}>
        {artInfos.map((art) => (
          <li key={art.id} className={styles.imgBody}>
            <Link href={`/arts/${art.id}`}>
              <a className={styles.a}>
                <Image
                  className={styles.img}
                  src={art.imgUrl}
                  alt={art.title}
                  width={reSize(art.size).width}
                  height={reSize(art.size).height}
                  loading="lazy"
                />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default React.memo(ArtLinkList)

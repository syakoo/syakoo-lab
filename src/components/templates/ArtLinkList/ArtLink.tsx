import React, { useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { reSize } from '@/logics/utils/img'
import { api } from '@/logics/api'
import { HeartBtn } from '@/components/molecules/HeartBtn'
import type { ArtInfo } from '@/types'

import styles from './styles.module.scss'

// ___________
//
interface ArtLinkProps {
  artInfo: ArtInfo
}

// ________
//
const ArtLinkComp: React.VFC<ArtLinkProps> = ({ artInfo }) => {
  const incrementFav = useCallback(async () => {
    await api.artFav.incrementArtFav(artInfo.id)
  }, [artInfo])

  const size = useMemo(() => {
    return reSize(artInfo.size, { width: 320, height: 240 })
  }, [artInfo])

  return (
    <div className={styles.ArtLink}>
      <Link href={`/arts/${artInfo.id}`}>
        <a className={styles.a}>
          <Image
            className={styles.img}
            src={artInfo.imgUrl}
            alt={artInfo.title}
            width={size.width}
            height={size.height}
            loading="lazy"
          />
        </a>
      </Link>
      <div className={styles.favBtn}>
        <HeartBtn activeEvent={incrementFav} />
      </div>
    </div>
  )
}

export const ArtLink = React.memo(ArtLinkComp)

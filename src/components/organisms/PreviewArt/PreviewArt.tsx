import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { reSize } from '@/logics/utils/img'
import { fireEvent } from '@/logics/analytics'
import type { ArtInfo } from '@/types'

import styles from './styles.module.scss'

// ___________
//
interface PreviewArtProps {
  artInfos: ArtInfo[]
}

// ___________
//
const PreviewArt: React.VFC<PreviewArtProps> = ({ artInfos }) => {
  const [artIdx, setArtIdx] = useState(
    Math.floor(Math.random() * artInfos.length)
  )

  const imgSize = useMemo(() => {
    return reSize(artInfos[artIdx].size, { width: 280 })
  }, [artIdx, artInfos])

  const onClick = useCallback(() => {
    fireEvent({
      action: 'click_art_link',
      category: 'Art',
      label: { artId: artInfos[artIdx].id },
    })
  }, [artIdx, artInfos])

  useEffect(() => {
    const id = setInterval(() => {
      setArtIdx((pre) => (pre + 1) % artInfos.length)
    }, 60 * 1000)

    return () => clearInterval(id)
  }, [setArtIdx])

  return (
    <div className={styles.PreViewArt}>
      <Link href="/arts">
        <a>
          <Image
            className={styles.img}
            src={artInfos[artIdx].imgUrl}
            alt="イラスト一覧へ"
            title="イラスト一覧へ"
            width={imgSize.width}
            height={imgSize.height}
            onClick={onClick}
          />
          <div className={styles.text}>イラスト一覧へ</div>
        </a>
      </Link>
    </div>
  )
}

export default React.memo(PreviewArt)

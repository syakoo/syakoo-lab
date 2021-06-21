import React, { useEffect, useCallback, useState } from 'react'

import { HeartBtn } from '@/components/molecules/HeartBtn'
import { api } from '@/logics/api'

import styles from './styles.module.scss'

// ___________
//
interface FavSection {
  artId: string
}

// ___________
//
const FavSectionComp: React.VFC<FavSection> = ({ artId }) => {
  const [fav, setFav] = useState<number | null>(null)

  const incrementFav = useCallback(async () => {
    setFav((f) => {
      if (f === null) {
        return null
      }
      return f + 1
    })
    await api.artFav.incrementArtFav(artId)
  }, [setFav])

  useEffect(() => {
    api.artFav.fetchArtFav(artId).then((resp) => {
      setFav(resp.fav)
    })
  }, [artId, setFav])

  return (
    <div className={styles.FavSection}>
      <HeartBtn activeEvent={incrementFav} />
      <span className={styles.text}>{fav}</span>
    </div>
  )
}

export const FavSection = React.memo(FavSectionComp)

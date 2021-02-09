import React from 'react'

import { Card } from '@/components/atoms/Card'
import type { ArtInfo } from '@/types'

import { ArtLink } from './ArtLink'
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
  const title = selectedTag ? `Arts #${selectedTag}` : 'Arts'

  return (
    <Card title={title}>
      <ul className={styles.artList}>
        {artInfos.map((art) => (
          <li key={art.id} className={styles.imgBody}>
            <ArtLink artInfo={art} />
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default React.memo(ArtLinkList)

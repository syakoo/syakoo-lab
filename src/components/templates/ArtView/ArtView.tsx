import React from 'react'
import Image from 'next/image'

import { Card } from '@/components/atoms/Card'
import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import { TagList } from '@/components/molecules/TagList'
import type { Art } from '@/types'

import { FavSection } from './FavSection'
import styles from './styles.module.scss'

// ___________
//
interface ArtViewProps {
  art: Art
}

// ___________
//
const ArtView: React.VFC<ArtViewProps> = ({ art }) => {
  return (
    <Card bgWhite>
      <div className={styles.imgBody}>
        <Image
          src={art.imgUrl}
          alt={art.title}
          width={art.size.width}
          height={art.size.height}
        />
      </div>
      <div className={styles.footer}>
        <FavSection artId={art.id} />
        <h1 className={styles.title}>{art.title}</h1>
        <div className={styles.description}>
          <MarkdownRenderer source={art.descriptionSource} />
        </div>
        <TagList tags={art.tags} baseUrl="/arts" />
        <div className={styles.date}>{art.published}</div>
      </div>
    </Card>
  )
}

export default ArtView

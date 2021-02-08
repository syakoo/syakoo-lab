import React from 'react'

import { TagList } from '@/components/molecules/TagList'

import styles from './styles.module.scss'

// ___________
//
interface TagListCardProps {
  tags: string[]
}

// ___________
//
const TagListCard: React.VFC<TagListCardProps> = ({ tags }) => {
  return (
    <div className={styles.TagListCard}>
      <h3 className={styles.title}>タグ一覧</h3>
      <TagList tags={tags} baseUrl="/articles" />
    </div>
  )
}

export default React.memo(TagListCard)

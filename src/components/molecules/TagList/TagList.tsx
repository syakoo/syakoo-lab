import React from 'react'

import { TextLink } from '@/components/atoms/TextLink'

import styles from './styles.module.scss'

// ___________
//
interface TagListProps {
  tags: string[]
  baseUrl?: string
}

// ___________
//
const TagList: React.VFC<TagListProps> = ({ tags, baseUrl }) => {
  if (!baseUrl) {
    return (
      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <li className={styles.normalTag} key={tag}>{`#${tag}`}</li>
        ))}
      </ul>
    )
  }

  return (
    <ul className={styles.tagList}>
      {tags.map((tag) => (
        <li key={tag} className={styles.linkedTag}>
          <TextLink href={`${baseUrl}/tags/${tag}`} isSmall>
            {`#${tag}`}
          </TextLink>
        </li>
      ))}
    </ul>
  )
}

export default TagList

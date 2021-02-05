import React from 'react'
import Link from 'next/link'

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
          <Link href={`${baseUrl}/tags/${tag}`}>
            <a>{`#${tag}`}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TagList

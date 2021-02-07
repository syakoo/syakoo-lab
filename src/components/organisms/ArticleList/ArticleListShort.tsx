import React from 'react'
import Link from 'next/link'

import type { ArticleInfo } from '@/types'

import styles from './styles.module.scss'

// ___________
//
interface ArticleListShortProps {
  articleInfos: ArticleInfo[]
}

// ___________
//
const ArticleListShort: React.VFC<ArticleListShortProps> = ({
  articleInfos,
}) => {
  if (articleInfos.length === 0) {
    return <div>Not Found X(</div>
  }

  return (
    <ul className={styles.ArticleListShort}>
      {articleInfos.map((info) => (
        <li key={info.id} className={styles.list}>
          <Link href={`/articles/${info.id}`}>
            <a className={styles.a}>
              <h4>{info.title}</h4>
            </a>
          </Link>
          <div className={styles.date}>{info.published}</div>
        </li>
      ))}
    </ul>
  )
}

export default React.memo(ArticleListShort)

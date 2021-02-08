import React from 'react'
import Link from 'next/link'

import { TagList } from '@/components/molecules/TagList'
import type { ArticleInfo } from '@/types'

import styles from './styles.module.scss'

// ___________
//
interface ArticleListProps {
  articles: ArticleInfo[]
}

// ___________
//
const ArticleList: React.VFC<ArticleListProps> = ({ articles }) => {
  return (
    <ul className={styles.ArticleList}>
      {articles.map((article) => (
        <li key={article.id}>
          <Link href={`/articles/${article.id}`}>
            <a className={styles.a}>
              <div className={styles.article}>
                <h3 className={styles.title}>{article.title}</h3>
                <TagList tags={article.tags} />
                <span className={styles.date}>{article.published}</span>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ArticleList

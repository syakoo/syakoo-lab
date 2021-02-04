import React from 'react'
import Link from 'next/link'

import { Card } from '@/components/atoms/Card'
import type { ArticleInfo } from '@/types'

import styles from './styles.module.scss'

// ___________
//
interface ArticleLinkListProps {
  articles: ArticleInfo[]
}

// ___________
//
const ArticleLinkList: React.VFC<ArticleLinkListProps> = ({ articles }) => {
  return (
    <Card title="Articles">
      {articles.map((article) => (
        <Link key={article.id} href={`/articles/${article.id}`}>
          <a className={styles.a}>
            <div className={styles.article}>
              <h3 className={styles.title}>{article.title}</h3>
              <span className={styles.date}>{article.published}</span>
            </div>
          </a>
        </Link>
      ))}
    </Card>
  )
}

export default ArticleLinkList

import React from 'react'
import Link from 'next/link'

import { Card } from '@/components/atoms/Card'
import { TagList } from '@/components/molecules/TagList'
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
      <ul className={styles.articleList}>
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
    </Card>
  )
}

export default ArticleLinkList

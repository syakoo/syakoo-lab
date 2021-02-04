import React from 'react'

import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import type { Article } from '@/types'

import styles from './styles.module.scss'

// ___________
//
interface ArticleViewProps {
  article: Article
}

// ___________
//
const ArticleView: React.VFC<ArticleViewProps> = ({ article }) => {
  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.date}>{article.published}</div>
        <h1 className={styles.title}>{article.title}</h1>
      </div>
      <section className={styles.body}>
        <MarkdownRenderer source={article.source} />
      </section>
    </article>
  )
}

export default ArticleView

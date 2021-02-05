import React from 'react'

import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import { TagList } from '@/components/molecules/TagList'
import { AboutMeShort } from '@/components/templates/AboutMe'
import type { Article, AboutMeInfo, Source } from '@/types'

import styles from './styles.module.scss'

// ___________
//
interface ArticleViewProps {
  article: Article
  aboutme: { info: AboutMeInfo; source: Source }
}

// ___________
//
const ArticleView: React.VFC<ArticleViewProps> = ({ article, aboutme }) => {
  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.date}>{article.published}</div>
        <h1 className={styles.title}>{article.title}</h1>
        <TagList tags={article.tags} baseUrl="/articles" />
      </div>
      <section className={styles.body}>
        <MarkdownRenderer source={article.source} />
      </section>
      <AboutMeShort aboutme={aboutme} />
    </article>
  )
}

export default ArticleView

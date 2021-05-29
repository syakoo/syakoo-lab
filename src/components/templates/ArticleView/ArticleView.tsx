import React, { useState, useEffect } from 'react'

import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import { TagList } from '@/components/molecules/TagList'
import { AboutMeShort } from '@/components/templates/AboutMe'
import type { Article, AboutMeInfo, Source } from '@/types'

import styles from './styles.module.scss'
import { Card } from './components/Card'

// ___________
//
interface ArticleViewProps {
  article: Article
  aboutme: { info: AboutMeInfo; source: Source }
}

const components: Record<string, React.ReactNode> = {
  Card,
}

// ___________
//
const ArticleView: React.VFC<ArticleViewProps> = ({ article, aboutme }) => {
  const [isLoadWidgets, setIsLoadWidgets] = useState(false)

  useEffect(() => {
    if (!isLoadWidgets) {
      const s = document.createElement('script')
      s.src = 'https://platform.twitter.com/widgets.js'
      document.body.appendChild(s)
      setIsLoadWidgets(true)
    }
  }, [isLoadWidgets, setIsLoadWidgets])

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.date}>{article.published}</div>
        <h1 className={styles.title}>{article.title}</h1>
        <TagList tags={article.tags} baseUrl="/articles" />
      </div>
      <section className={styles.body}>
        <MarkdownRenderer source={article.source} components={components} />
      </section>
      <AboutMeShort aboutme={aboutme} />
    </article>
  )
}

export default React.memo(ArticleView)

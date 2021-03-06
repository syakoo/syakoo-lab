import React, { useState, useEffect } from 'react'

import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import { TagList } from '@/components/molecules/TagList'
import { AboutMeShort } from '@/components/templates/AboutMe'
import type { Article, AboutMeInfo, Source } from '@/types'

import styles from './styles.module.scss'
import { components } from './components'

// ___________
//
interface ArticleViewProps {
  article: Article
  aboutme: { info: AboutMeInfo; source: Source }
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
        <div className={styles.date}>
          <span>{`${article.published} 公開`}</span>
          {article.updated && `, ${article.updated} 更新`}
        </div>
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

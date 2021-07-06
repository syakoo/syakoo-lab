import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { TagList } from '@/components/molecules/TagList'
import type { ArticleInfo, SiteName } from '@/types'

import styles from './styles.module.scss'

// ___________
//
interface ArticleListProps {
  articles: ArticleInfo[]
}

// ___________
//
const siteImgs: { [k in SiteName]: string } = {
  Qiita: '/img/links/qiita.png',
  "Syakoo's Lab": '/logo.png',
}

// ___________
//
const ArticleList: React.VFC<ArticleListProps> = ({ articles }) => {
  return (
    <ul className={styles.ArticleList}>
      {articles.map((article) => (
        <li key={article.id}>
          <Link href={article.link}>
            <a className={styles.a}>
              <div className={styles.article}>
                <div className={styles.site}>
                  <Image
                    src={siteImgs[article.siteName] || ''}
                    width={20}
                    height={20}
                    alt={article.siteName}
                  />
                  <span className={styles.siteName}>{article.siteName}</span>
                </div>
                <h3 className={styles.title}>{article.title}</h3>
                <TagList tags={article.tags} />
                <span className={styles.date}>
                  {article.updated ? article.updated : article.published}
                </span>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ArticleList

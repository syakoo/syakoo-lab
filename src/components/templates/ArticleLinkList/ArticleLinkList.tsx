import React from 'react'

import { Card } from '@/components/atoms/Card'
import { ArticleList } from '@/components/organisms/ArticleList'
import type { ArticleInfo } from '@/types'

// import styles from './styles.module.scss'

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
      <ArticleList articles={articles} />
    </Card>
  )
}

export default ArticleLinkList

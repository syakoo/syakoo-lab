import React from 'react'

import { Card } from '@/components/atoms/Card'
import { ArticleList } from '@/components/organisms/ArticleList'
import type { ArticleInfo } from '@/types'

// import styles from './styles.module.scss'

// ___________
//
interface ArticleLinkListProps {
  articles: ArticleInfo[]
  selectedTag?: string
}

// ___________
//
const ArticleLinkList: React.VFC<ArticleLinkListProps> = ({
  articles,
  selectedTag,
}) => {
  const title = selectedTag ? `Articles #${selectedTag}` : 'Articles'
  return (
    <Card title={title}>
      <ArticleList articles={articles} />
    </Card>
  )
}

export default ArticleLinkList

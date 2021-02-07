import React from 'react'

import { Card } from '@/components/atoms/Card'
import { ArticleListShort } from '@/components/organisms/ArticleList'
import type { ArticleInfo } from '@/types'

import styles from './styles.module.scss'

// ___________
//
interface RelatedArticleListBlockProps {
  relatedArticles: ArticleInfo[]
}

// ___________
//
const RelatedArticleListBlock: React.VFC<RelatedArticleListBlockProps> = ({
  relatedArticles,
}) => {
  return (
    <Card>
      <h3 className={styles.title}>関連記事</h3>
      <ArticleListShort articleInfos={relatedArticles} />
    </Card>
  )
}

export default RelatedArticleListBlock

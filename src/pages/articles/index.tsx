import { NextPage } from 'next'

import { DoubleLayout } from '@/components/layouts/DoubleLayout'
import { ArticleLinkList } from '@/components/templates/ArticleLinkList'
import { readArticlesManifest } from '@/logics/articles'
import type { ArticleInfo } from '@/types'

// ___________
//
type ArticlesPageProps = {
  articleInfos: ArticleInfo[]
}

// ___________
//
const ArticlesPage: NextPage<ArticlesPageProps> = ({ articleInfos }) => {
  return (
    <DoubleLayout
      mainComponent={<ArticleLinkList articles={articleInfos} />}
      subComponent={<div>sub</div>}
    />
  )
}

// ___________
//
export const getStaticProps = async () => {
  const articleInfos = await readArticlesManifest()

  return { props: { articleInfos } }
}

export default ArticlesPage

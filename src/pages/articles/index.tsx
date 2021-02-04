import { NextPage } from 'next'
import Link from 'next/link'

import { SingleLayout } from '@/components/layouts/SingleLayout'
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
    <SingleLayout>
      <ArticleLinkList articles={articleInfos} />
    </SingleLayout>
  )
}

// ___________
//
export const getStaticProps = async () => {
  const articleInfos = await readArticlesManifest()

  return { props: { articleInfos } }
}

export default ArticlesPage

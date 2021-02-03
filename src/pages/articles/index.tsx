import { NextPage } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import type { ArticleInfo } from '@/types'

import { readArticlesManifest } from '@/logics/articles'

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
      <h2>Articles Page</h2>
      {articleInfos.map((articleInfo) => (
        <p key={articleInfo.id}>{articleInfo.title}</p>
      ))}
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

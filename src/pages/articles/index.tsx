import { NextPage } from 'next'
import Link from 'next/link'

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
        <Link key={articleInfo.id} href={`articles/${articleInfo.id}`}>
          {articleInfo.title}
        </Link>
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

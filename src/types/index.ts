import type { MdxRemote } from 'next-mdx-remote/types'

// ___________
//
export type ContentDirs = 'articles'

export interface ArticleInfo {
  title: string
  published: string
  updated?: string
  id: string
}

export interface Article extends ArticleInfo {
  source: MdxRemote.Source
}

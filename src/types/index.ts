import type { MdxRemote } from 'next-mdx-remote/types'

// ___________
//
export type ContentDirs = 'articles' | 'aboutme'
export type Source = MdxRemote.Source

// ___________
// Article
export interface ArticleInfo {
  title: string
  published: string
  updated?: string
  id: string
}

export interface Article extends ArticleInfo {
  source: Source
}

// ___________
// AboutMe
export interface AboutMeLink {
  name: string
  url: string
  imgUrl: string
}
export interface AboutMeInfo {
  name: string
  imgUrl: string
  links: AboutMeLink[]
  certificates: string[]
  timeline: {
    [k: string]: string[]
  }
}

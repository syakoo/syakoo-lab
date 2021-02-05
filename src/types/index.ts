import type { MdxRemote } from 'next-mdx-remote/types'

// ___________
//
export type ContentDirs = 'articles' | 'aboutme' | 'apps' | 'arts' | 'aboutsite'
export type Source = MdxRemote.Source

// ___________
// Article
export interface ArticleInfo {
  title: string
  published: string
  updated?: string
  tags: string[]
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

// ___________
// App
export interface AppInfo {
  title: string
  released: string
  repoUrl?: string
  siteUrl?: string
  imgUrl: string
  id: string
}

export interface App extends AppInfo {
  descriptionSource: Source
}

// ___________
// Art
export interface ArtInfo {
  title: string
  published: string
  imgUrl: string
  size: { width: number; height: number }
  tags: string[]
  id: string
}

export interface Art extends ArtInfo {
  descriptionSource: Source
}

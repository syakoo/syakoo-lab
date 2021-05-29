import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

// ___________
//
export type ContentDirs = 'articles' | 'aboutme' | 'apps' | 'arts' | 'aboutsite'
export type Source = MDXRemoteSerializeResult

// ___________
// Article
export type SiteName = "Syakoo's Lab" | 'Qiita'

export interface ArticleInfo {
  title: string
  published: string
  updated?: string
  tags: string[]
  id: string
  link: string
  siteName: SiteName
}

export interface Article extends ArticleInfo {
  source: Source
}

export interface ArticleManifest {
  posts: ArticleInfo[]
  tags: string[]
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

export interface ArtManifest {
  posts: ArtInfo[]
  tags: string[]
}

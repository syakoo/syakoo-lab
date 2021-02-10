import Parser from 'rss-parser'

import type { ArticleInfo } from '@/types'
import { formatDate } from './utils/date'

// ___________
//
const parser = new Parser()

// ___________
//
export const fetchFeedItems = async (url: string, siteName: string) => {
  const feed = await parser.parseURL(url)
  if (!feed.items?.length) return []

  const result = feed.items.map(
    (item): ArticleInfo => ({
      title: item.title || '',
      published: item.isoDate ? formatDate(item.isoDate) : '',
      tags: [siteName],
      id: `${siteName}${item.title}`,
      link: item.link || '',
      siteName,
    })
  )

  return result
}

import matter from 'gray-matter'

import type { AppInfo, App } from '@/types'
import { readFile, getDirs } from './utils/fileSystem'
import { convertMdx2Source } from './utils/mdx'

// ___________
//
export const getApps = async () => {
  const appIds = await getDirs('apps')
  const result: App[] = await Promise.all(
    appIds.map(async (id) => {
      const rowData = await readFile('apps', `${id}/index.mdx`)
      const { data, content } = matter(rowData)
      const descriptionSource = await convertMdx2Source(content)

      return {
        ...(data as AppInfo),
        id,
        descriptionSource,
      }
    })
  )

  return result
}

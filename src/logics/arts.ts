import matter from 'gray-matter'
import sizeOf from 'image-size'

import type { ArtInfo, ArtManifest } from '@/types'
import { readFile, getDirs, withPublicDir } from './utils/fileSystem'
import { convertMdx2Source } from './utils/mdx'

// ___________
//
export const readArt = async (artId: string) => {
  const rowData = await readFile('arts', `${artId}/index.mdx`)
  const { data, content } = matter(rowData)

  return { data, content }
}

export const readArtsManifest = async () => {
  const result = await readFile('arts', 'manifest.json').then((data) =>
    JSON.parse(data)
  )

  return result as ArtManifest
}

// ___________
//
export const getRecentlyArts = async () => {
  const { posts } = await readArtsManifest()
  const result = posts.slice(0, 6)

  return result
}

export const getArtDescriptionSource = async (artId: string) => {
  const { content } = await readArt(artId)
  const result = await convertMdx2Source(content)

  return result
}

export const getArtInfoFromManifest = async (artId: string) => {
  const { posts } = await readArtsManifest()
  const result = posts.find((art) => art.id === artId)

  return result
}

export const collectArtInfos = async () => {
  const artIds = await getDirs('arts')
  const artInfos: ArtInfo[] = await Promise.all(
    artIds.map(async (id) => {
      const { data } = await readArt(id)
      const { width, height } = sizeOf(withPublicDir(data.imgUrl))
      const artInfo = {
        ...data,
        size: { width, height },
        id,
      } as ArtInfo

      return artInfo
    })
  )
  const result = artInfos.sort(
    (art1, art2) =>
      new Date(art2.published).getTime() - new Date(art1.published).getTime()
  )

  return result
}

import type { AboutMeInfo } from '@/types'
import { readFile } from './utils/fileSystem'
import { convertMdx2Source } from './utils/mdx'

// ___________
//
export const getAboutMeInfo = async () => {
  const info = await readFile('aboutme', 'info.json')
  const result: AboutMeInfo = JSON.parse(info)

  return result
}

export const getAboutMeSource = async () => {
  const aboutme = await readFile('aboutme', 'aboutme.mdx')
  const result = await convertMdx2Source(aboutme)

  return result
}

export const getAboutMeShortSource = async () => {
  const aboutme = await readFile('aboutme', 'aboutmeShort.mdx')
  const result = await convertMdx2Source(aboutme)

  return result
}

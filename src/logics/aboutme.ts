import type { AboutMeInfo } from '@/types'
import { readFile } from './fileSystem'
import { convertMdx2Source } from './mdx'

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

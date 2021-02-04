import path from 'path'
import fs from 'fs'

import type { ContentDirs } from '@/types'

// ___________
//
const contentsDir = path.join(process.cwd(), 'contents')
export const withPublicDir = (pathStr: string) =>
  path.join(process.cwd(), 'public', pathStr)

// ___________
//
export const getDirs = async (dirName: ContentDirs) => {
  const dirs = fs.readdirSync(path.join(contentsDir, dirName), {
    withFileTypes: true,
  })
  const result = dirs
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  return result
}

export const readFile = async (dirName: ContentDirs, fileName: string) => {
  const fullPath = path.join(contentsDir, dirName, fileName)
  const result = fs.readFileSync(fullPath, 'utf-8')

  return result
}

export const writeFile = async (
  dirName: ContentDirs,
  fileName: string,
  data: string
) => {
  const fullPath = path.join(contentsDir, dirName, fileName)
  fs.writeFileSync(fullPath, data, 'utf-8')
}

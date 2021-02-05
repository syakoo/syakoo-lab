import { readFile } from './utils/fileSystem'
import { convertMdx2Source } from './utils/mdx'

// ___________
//
export const getAboutSiteSource = async () => {
  const aboutsite = await readFile('aboutsite', 'aboutsite.mdx')
  const result = await convertMdx2Source(aboutsite)

  return result
}

import { collectArticlesInfo } from './articles'
import { collectArtInfos } from './arts'
import { writeFile } from './utils/fileSystem'

// ___________
//
const execArticles = async () => {
  const articleInfo = await collectArticlesInfo()
  writeFile('articles', 'manifest.json', JSON.stringify({ posts: articleInfo }))
}

const execArts = async () => {
  const artInfos = await collectArtInfos()
  writeFile('arts', 'manifest.json', JSON.stringify({ posts: artInfos }))
}

;(async function () {
  await execArticles()
  await execArts()
})()

import { collectArticlesInfo } from './articles'
import { collectArtInfos } from './arts'
import { collectTags } from './tags'
import { writeFile } from './utils/fileSystem'

// ___________
//
const execArticles = async () => {
  const articleInfos = await collectArticlesInfo()
  const tags = collectTags(articleInfos)

  const manifest = {
    posts: articleInfos,
    tags,
  }
  writeFile('articles', 'manifest.json', JSON.stringify(manifest))
}

const execArts = async () => {
  const artInfos = await collectArtInfos()
  const tags = collectTags(artInfos)

  const manifest = {
    posts: artInfos,
    tags,
  }
  writeFile('arts', 'manifest.json', JSON.stringify(manifest))
}

;(async function () {
  await execArticles()
  await execArts()
})()

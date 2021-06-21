import dotenv from 'dotenv'

import { collectArticlesInfo } from './articles'
import { collectArtInfos } from './arts'
import { collectTags } from './tags'
import { writeFile } from './utils/fileSystem'
import { api } from './api'

dotenv.config()

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

  // update DB
  const artIds = artInfos.map((art) => art.id)
  await api.artFav.syncArts(artIds)
}

;(async function () {
  await execArticles()
  await execArts()
})()

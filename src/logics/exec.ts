import dotenv from 'dotenv'

import fs from 'fs'

import { collectArticlesInfo } from './articles'
import { collectArtInfos } from './arts'
import { collectTags } from './tags'
import { writeFile } from './utils/fileSystem'
import { generateSitemapXML } from './sitemap'
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
  // Generate a sitemap
  const sitemapXML = await generateSitemapXML(articleInfos)
  fs.writeFileSync('./public/sitemap.xml', sitemapXML)
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

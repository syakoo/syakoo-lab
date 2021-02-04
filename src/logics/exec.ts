import { collectArticlesInfo } from './articles'
import { writeFile } from './utils/fileSystem'

// ___________
//
const execArticles = async () => {
  const articleInfo = await collectArticlesInfo()
  writeFile('articles', 'manifest.json', JSON.stringify({ posts: articleInfo }))
}

;(async function () {
  await execArticles()
})()

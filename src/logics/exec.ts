import { collectArticlesInfo } from './articles'
import { writeFile } from './fileSystem'

// ___________
//
const execArticles = async () => {
  const articleInfo = await collectArticlesInfo()
  writeFile('articles', 'manifest.json', JSON.stringify(articleInfo))
}

;(async function () {
  await execArticles()
})()

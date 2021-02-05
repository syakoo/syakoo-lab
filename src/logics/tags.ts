export const collectTags = <T extends { tags: string[] }>(
  articleInfos: T[]
) => {
  const tags = articleInfos.reduce<string[]>((ts, articleInfo) => {
    const set = new Set([...ts, ...articleInfo.tags])
    return Array.from(set)
  }, [])

  return tags
}

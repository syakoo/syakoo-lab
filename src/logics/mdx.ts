import renderToString from 'next-mdx-remote/render-to-string'

// ___________
//
export const convertMdx2Source = async (content: string) => {
  const result = await renderToString(content, {})

  return result
}

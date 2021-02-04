import rehypePrism from '@mapbox/rehype-prism'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import renderToString from 'next-mdx-remote/render-to-string'

// ___________
//
export const convertMdx2Source = async (content: string) => {
  const result = await renderToString(content, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypePrism, rehypeKatex],
    },
  })

  return result
}

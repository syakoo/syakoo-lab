import rehypePrism from '@mapbox/rehype-prism'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import { serialize } from 'next-mdx-remote/serialize'

// ___________
//
export const convertMdx2Source = async (content: string) => {
  const result = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypePrism, rehypeKatex],
    },
  })

  return result
}

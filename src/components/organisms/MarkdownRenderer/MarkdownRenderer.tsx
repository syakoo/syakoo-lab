import React from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

// import styles from './styles.module.scss'

// ___________
//
type MarkdownRendererProps = { source: MDXRemoteSerializeResult } & Omit<
  Parameters<typeof MDXRemote>[0],
  'compiledSource'
>

// ___________
//
const MarkdownRenderer: React.VFC<MarkdownRendererProps> = ({
  source,
  ...props
}) => {
  return <MDXRemote {...source} {...props} />
}

export default MarkdownRenderer

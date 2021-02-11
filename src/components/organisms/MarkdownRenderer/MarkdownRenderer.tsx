import React from 'react'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'

// import styles from './styles.module.scss'

// ___________
//
interface MarkdownRendererProps {
  source: MdxRemote.Source
  components?: MdxRemote.Components
}

// ___________
//
const MarkdownRenderer: React.VFC<MarkdownRendererProps> = ({
  source,
  components,
}) => {
  const content = hydrate(source, { components })

  return <>{content}</>
}

export default MarkdownRenderer

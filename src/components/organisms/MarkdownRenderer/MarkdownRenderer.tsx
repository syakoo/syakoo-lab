import React from 'react'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'

import styles from './styles.module.scss'

// ___________
//
interface MarkdownRendererProps {
  source: MdxRemote.Source
}

// ___________
//
const MarkdownRenderer: React.VFC<MarkdownRendererProps> = ({ source }) => {
  const content = hydrate(source, {})

  return <>{content}</>
}

export default MarkdownRenderer

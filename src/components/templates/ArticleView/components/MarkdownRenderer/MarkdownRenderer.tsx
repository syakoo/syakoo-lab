import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// ___________
//
type MarkdownRendererProps = {
  children: string
}

// ___________
//
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ children }) => (
  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
    {children}
  </ReactMarkdown>
)

export default MarkdownRenderer

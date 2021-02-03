---
to: src/components/<%= level %>/<%= name %>/<%= name %>.tsx
---
import React from 'react'

import styles from './styles.module.scss'

// ___________
//
interface <%= name %>Props {}

// ___________
//
const <%= name %>: React.VFC<<%= name %>Props> = () => {
  return <div>Hi</div>
}

export default <%= name %>

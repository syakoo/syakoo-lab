import React from 'react'

import styles from './styles.module.scss'

// ___________
//
export const StickyBlock: React.FC = ({ children }) => (
  <div className={styles.Sticky}>{children}</div>
)

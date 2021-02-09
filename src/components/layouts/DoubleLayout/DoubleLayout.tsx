import React, { ReactElement, ReactNode } from 'react'

import styles from './styles.module.scss'

// ___________
//
type MainBlock = {
  __type: 'MAIN'
}
type SubBlock = {
  __type: 'SUB'
}

interface DoubleLayoutProps {
  children: [ReactElement<MainBlock>, ReactElement<SubBlock>]
}

type BlockFC<T extends MainBlock | SubBlock> = (props: {
  children: ReactNode
}) => ReactElement<T>

// ___________
//
export const MainBlock: BlockFC<MainBlock> = ({ children }) => {
  return <div className={styles.mainComp}>{children}</div>
}
export const SubBlock: BlockFC<SubBlock> = ({ children }) => {
  return <div className={styles.subComp}>{children}</div>
}

// ___________
//
const DoubleLayout: React.VFC<DoubleLayoutProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      {children[0]}
      {children[1]}
    </main>
  )
}

export default DoubleLayout

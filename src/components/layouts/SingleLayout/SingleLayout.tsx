import React from 'react'

import { Header } from '@/components/organisms/Header'

import styles from './styles.module.scss'

// ___________
//
type SingleLayoutProps = {
  isLarge?: boolean
}

// ___________
//
const SingleLayout: React.FC<SingleLayoutProps> = ({ children, isLarge }) => {
  return (
    <>
      <Header />
      <main className={styles.Main} data-is-large={isLarge}>
        {children}
      </main>
    </>
  )
}

export default SingleLayout

import React from 'react'

import { Header } from '@/components/templates/Header'
import { Footer } from '@/components/templates/Footer'

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
      <Footer />
    </>
  )
}

export default SingleLayout

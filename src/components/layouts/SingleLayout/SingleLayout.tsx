import React from 'react'

import { Header } from '@/components/organisms/Header'

import styles from './styles.module.scss'

// ___________
//
const SingleLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.Main}>{children}</main>
    </>
  )
}

export default SingleLayout

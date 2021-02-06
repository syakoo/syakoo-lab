import React from 'react'

import { Header } from '@/components/templates/Header'
import { Footer } from '@/components/templates/Footer'

import styles from './styles.module.scss'

// ___________
//
interface DoubleLayoutProps {
  mainComponent: React.ReactElement
  subComponent: React.ReactElement
}

// ___________
//
const DoubleLayout: React.VFC<DoubleLayoutProps> = ({
  mainComponent,
  subComponent,
}) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.mainComp}>{mainComponent}</div>
        <div className={styles.subComp}>{subComponent}</div>
      </main>
      <Footer />
    </>
  )
}

export default DoubleLayout

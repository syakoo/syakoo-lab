import React from 'react'

import styles from './styles.module.scss'

import { Header } from '@/components/organisms/Header'

// ___________
//
interface SingleLayoutProps {}

// ___________
//
const SingleLayout: React.FC<SingleLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default SingleLayout

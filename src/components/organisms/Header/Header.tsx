import React from 'react'

import styles from './styles.module.scss'

// ___________
//
interface HeaderProps {}

// ___________
//
const Header: React.VFC<HeaderProps> = () => {
  return (
    <header>
      <h1>Syakoo's Lab</h1>
      <nav></nav>
    </header>
  )
}

export default Header

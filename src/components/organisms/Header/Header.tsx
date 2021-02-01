import React from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'
import { navData } from './navData'

// ___________
//
interface HeaderProps {}

// ___________
//
const Header: React.VFC<HeaderProps> = () => {
  return (
    <header>
      <h1>Syakoo's Lab</h1>
      <nav>
        {navData.map((d) => (
          <Link href={d.url} key={d.title}>
            {d.title}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header

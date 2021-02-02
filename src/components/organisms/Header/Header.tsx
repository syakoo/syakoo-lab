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
    <header className={styles.Header}>
      <div>Syakoo's Lab</div>
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

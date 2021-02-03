import React from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'
import { navData } from './navData'

// ___________
//
const Header: React.VFC = () => {
  return (
    <header className={styles.Header}>
      <div>Syakoo&apos;s Lab</div>
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

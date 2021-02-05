import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { TitleSVG } from '@/components/atoms/TitleSVG'

import styles from './styles.module.scss'
import { navData } from './navData'

// ___________
//
const Header: React.VFC = () => {
  const { route } = useRouter()

  return (
    <header className={styles.Header}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <Link href="/">
            <a>
              <TitleSVG />
            </a>
          </Link>
        </div>
        <nav>
          {navData.map((d) => (
            <Link href={d.url} key={d.title}>
              <a data-is-activate={route.match(d.url)}>{d.title}</a>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header

import React from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'

// ___________
//
const Footer: React.VFC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>© 2021 Syakoo&apos;s Lab</div>
        <div className={styles.nav}>
          <nav>
            <Link href="/">
              <a>ホーム</a>
            </Link>
            <Link href="/privacy-policy">
              <a>プライバシーポリシー</a>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer

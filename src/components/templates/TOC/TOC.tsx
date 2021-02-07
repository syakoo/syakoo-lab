import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './styles.module.scss'

// ___________
//
const TOC: React.VFC = () => {
  const [toc, setToc] = useState<string[]>([])
  const { asPath } = useRouter()

  useEffect(() => {
    const h2Els = document.querySelectorAll('article h2')
    const chapters: string[] = []

    h2Els.forEach((el, i) => {
      el.setAttribute('id', `chap-${i}`)
      chapters.push(el.innerHTML)
    })

    setToc(chapters)
  }, [setToc, asPath])

  return (
    <div className={styles.TOC}>
      <h3 className={styles.title}>目次</h3>
      <ul className={styles.list}>
        {toc.map((chap, i) => (
          <li key={chap} className={styles.item}>
            <Link href={`${asPath.split('#')[0]}#chap-${i}`}>
              <a>{chap}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default React.memo(TOC)

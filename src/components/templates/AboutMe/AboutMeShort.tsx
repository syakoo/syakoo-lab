import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import { Source, AboutMeInfo } from '@/types'

import styles from './styles.module.scss'

// ___________
//
type AboutMeShortProps = {
  aboutme: { info: AboutMeInfo; source: Source }
}

// ___________
//
const AboutMeShort: React.VFC<AboutMeShortProps> = ({ aboutme }) => {
  return (
    <div className={styles.head}>
      <Link href="/about-me">
        <a>
          <Image
            className={styles.meImg}
            src={aboutme.info.imgUrl}
            alt="me"
            width={64}
            height={64}
          />
        </a>
      </Link>
      <div className={styles.right}>
        <div className={styles.shortName}>
          <Link href="/about-me">{aboutme.info.name}</Link>
        </div>
        <div className={styles.shortDescription}>
          <MarkdownRenderer source={aboutme.source} />
        </div>
      </div>
    </div>
  )
}

export default AboutMeShort

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Card } from '@/components/atoms/Card'
import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import type { Source, AboutMeLink } from '@/types'

import styles from './styles.module.scss'

// ___________
//
type AboutMeProps = {
  descriptionSource: Source
  name: string
  imgUrl: string
  links: AboutMeLink[]
}

// ___________
//
const AboutMe: React.VFC<AboutMeProps> = ({
  descriptionSource,
  name,
  imgUrl,
  links,
}) => {
  return (
    <Card title="About Me">
      <div className={styles.head}>
        <Image
          className={styles.meImg}
          src={imgUrl}
          alt="me"
          width={120}
          height={120}
          priority
        />
        <div className={styles.right}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.links}>
            {links.map((link) => (
              <Link key={link.name} href={link.url}>
                <a>
                  <Image
                    src={link.imgUrl}
                    alt={link.name}
                    width={24}
                    height={24}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div>
        <MarkdownRenderer source={descriptionSource} />
      </div>
    </Card>
  )
}

export default AboutMe

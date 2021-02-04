import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Card } from '@/components/atoms/Card'
import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import type { Source, AboutMeLink } from '@/types'

// import styles from './styles.module.scss'

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
      <div>
        <Image src={imgUrl} alt="me" width={120} height={120} />
        <div>
          <h3>{name}</h3>
          <div>
            {links.map((link) => (
              <Link key={link.name} href={link.url}>
                <Image
                  src={link.imgUrl}
                  alt={link.name}
                  width={24}
                  height={24}
                />
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

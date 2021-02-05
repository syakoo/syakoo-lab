import React from 'react'
import Link from 'next/link'

import { SiteLogo } from '@/components/atoms/SiteLogo'
import { Card } from '@/components/atoms/Card'
import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import type { Source } from '@/types'

import styles from './styles.module.scss'

// ___________
//
type AboutSiteProps = {
  aboutSiteSource: Source
}

// ___________
//
const AboutSite: React.VFC<AboutSiteProps> = ({ aboutSiteSource }) => {
  return (
    <Card>
      <div className={styles.logo}>
        <SiteLogo />
      </div>
      <div>
        <MarkdownRenderer source={aboutSiteSource} />
      </div>
    </Card>
  )
}

export default AboutSite

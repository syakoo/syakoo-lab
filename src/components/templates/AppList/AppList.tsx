import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import { Card } from '@/components/atoms/Card'
import type { App } from '@/types'

import styles from './styles.module.scss'

// ___________
//
interface AppListProps {
  apps: App[]
}

// ___________
//
const AppList: React.VFC<AppListProps> = ({ apps }) => {
  return (
    <Card title="Apps">
      {apps.map((app) => (
        <div className={styles.app} key={app.id}>
          <Link href={app.siteUrl || ''}>
            <a>
              <Image src={app.imgUrl} alt={app.title} width={84} height={84} />
            </a>
          </Link>
          <div className={styles.body}>
            <Link href={app.siteUrl || ''}>
              <a className={styles.title}>
                <h3 className={styles.h3}>{app.title}</h3>
              </a>
            </Link>
            {app.repoUrl && (
              <div className={styles.repo}>
                <span>repo: </span>
                <Link href={app.repoUrl}>{app.repoUrl}</Link>
              </div>
            )}
            <div className={styles.description}>
              <MarkdownRenderer source={app.descriptionSource} />
            </div>
          </div>
        </div>
      ))}
    </Card>
  )
}

export default AppList

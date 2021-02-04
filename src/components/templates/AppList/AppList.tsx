import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import { Card } from '@/components/atoms/Card'
import type { App } from '@/types'

// import styles from './styles.module.scss'

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
        <div key={app.id}>
          <Link href={app.siteUrl || ''}>
            <Image src={app.imgUrl} alt={app.title} width={84} height={84} />
          </Link>
          <div>
            <Link href={app.siteUrl || ''}>
              <h3>{app.title}</h3>
            </Link>
            {app.repoUrl && (
              <div>
                <span>repo: </span>
                <Link href={app.repoUrl}>{app.repoUrl}</Link>
              </div>
            )}
            <MarkdownRenderer source={app.descriptionSource} />
          </div>
        </div>
      ))}
    </Card>
  )
}

export default AppList

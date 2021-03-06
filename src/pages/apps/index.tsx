import { NextPage, GetStaticProps } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { CustomHead } from '@/components/atoms/CustomHead'
import { AppList } from '@/components/templates/AppList'
import { getApps } from '@/logics/apps'
import type { App } from '@/types'

// ___________
//
type AppsPageProps = {
  apps: App[]
}

// ___________
//
const AppsPage: NextPage<AppsPageProps> = ({ apps }) => (
  <SingleLayout>
    <CustomHead url="/apps" title="アプリ一覧" />
    <AppList apps={apps} />
  </SingleLayout>
)

// ___________
//
export const getStaticProps: GetStaticProps<AppsPageProps> = async () => {
  const apps = await getApps()

  return { props: { apps } }
}

export default AppsPage

import { NextPage, GetStaticProps } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { CustomHead } from '@/components/atoms/CustomHead'
import { AboutSite } from '@/components/templates/AboutSite'
import { getAboutSiteSource } from '@/logics/aboutsite'
import type { Source } from '@/types'

// ___________
//
type HomePageProps = {
  aboutSiteSource: Source
}

// ___________
//
const HomePage: NextPage<HomePageProps> = ({ aboutSiteSource }) => {
  return (
    <SingleLayout>
      <CustomHead url="/" title="ホーム" />
      <AboutSite aboutSiteSource={aboutSiteSource} />
    </SingleLayout>
  )
}

// ___________
//
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const aboutSiteSource = await getAboutSiteSource()

  return { props: { aboutSiteSource } }
}

export default HomePage

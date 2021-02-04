import { NextPage, GetStaticProps } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { AboutMe } from '@/components/organisms/AboutMe'
import { getAboutMeInfo, getAboutMeSource } from '@/logics/aboutme'
import type { AboutMeInfo, Source } from '@/types'

// ___________
//
type AboutMePageProps = {
  aboutmeInfo: AboutMeInfo
  descriptionSource: Source
}

// ___________
//
const AboutMePage: NextPage<AboutMePageProps> = ({
  aboutmeInfo,
  descriptionSource,
}) => (
  <SingleLayout>
    <AboutMe
      name={aboutmeInfo.name}
      imgUrl={aboutmeInfo.imgUrl}
      descriptionSource={descriptionSource}
      links={aboutmeInfo.links}
    />
  </SingleLayout>
)

// ___________
//
export const getStaticProps: GetStaticProps<AboutMePageProps> = async () => {
  const info = await getAboutMeInfo()
  const source = await getAboutMeSource()

  return {
    props: {
      aboutmeInfo: info,
      descriptionSource: source,
    },
  }
}

export default AboutMePage

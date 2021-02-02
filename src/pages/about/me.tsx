import { NextPage } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { AboutMe } from '@/components/organisms/AboutMe'

// ___________
//
const AboutMePage: NextPage = () => (
  <SingleLayout>
    <AboutMe />
  </SingleLayout>
)

export default AboutMePage

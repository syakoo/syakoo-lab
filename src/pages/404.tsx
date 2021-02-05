import { NextPage } from 'next'

import { SingleLayout } from '@/components/layouts/SingleLayout'
import { Error } from '@/components/templates/Error'

// ___________
//
const Error404: NextPage = () => {
  return (
    <SingleLayout>
      <Error errorCode={404} />
    </SingleLayout>
  )
}

export default Error404

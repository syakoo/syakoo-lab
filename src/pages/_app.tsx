import { AppProps } from 'next/app'

import '../../public/style.css'

// ___________
//
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

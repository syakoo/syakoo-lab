import { AppProps } from 'next/app'

import '../../public/style.css'
import '../../public/prism.css'

// ___________
//
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
        integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { Header } from '@/components/templates/Header'
import { Footer } from '@/components/templates/Footer'
import { GA_ID, pageViewEvent } from '@/logics/analytics'

import '../../public/style.css'
import '../../public/prism.css'

// ___________
//
const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  useEffect(() => {
    if (!GA_ID) return

    router.events.on('routeChangeComplete', pageViewEvent)
    // eslint-disable-next-line consistent-return
    return () => {
      router.events.off('routeChangeComplete', pageViewEvent)
    }
  }, [router.events])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
        integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
        crossOrigin="anonymous"
      />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp

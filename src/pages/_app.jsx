
import Script from 'next/script'
import dynamic from 'next/dynamic'

import Footer from '../../fragments/Footer'
import ActivationHandler from '../../axg-react/ActivationHandler'
const Axg = dynamic(() => import('../../axg-react/Run'), {ssr: false})

export default function App({ Component, pageProps }) {
  return (<>
      <Component {...pageProps} />
      <Footer />
      <ActivationHandler />
      <Script src={'http://localhost:3012/init/v5'} type={'module'} strategy={"beforeInteractive"}></Script>
      <Script src={'http://localhost:3012/global/runScripts'} strategy={'afterInteractive'}></Script>
      <Script src={'/activationhandlerutils.js'} strategy={"beforeInteractive"}></Script>
      <Script src={'/switchThemescheme.js'} strategy={"beforeInteractive"}></Script>
      <Axg />
  </>)
}
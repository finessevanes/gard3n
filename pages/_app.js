import '../styles/globals.css'

import { Web3ReactProvider } from '@web3-react/core';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  const layoutStyle = `
    bg-lens-100
    flex
    justify-center
    w-screen
  `

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
    <div className={layoutStyle}>
      <Component {...pageProps} />
    </div>
    </Web3ReactProvider>
  )
}

export default MyApp


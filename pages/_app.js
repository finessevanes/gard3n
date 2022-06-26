import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const layoutStyle = `
  bg-lens-100
  h-screen
  flex
  `




  return (
    <div className={layoutStyle}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

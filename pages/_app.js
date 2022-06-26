import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const layoutStyle = `
    bg-lens-100
    min-h-screen
    flex
    justify-center
    text-center
  `

  return (
    <div className={layoutStyle}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

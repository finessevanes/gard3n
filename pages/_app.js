import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const layoutStyle = `

  `

  const HomePageStyle = `
  
  `
  return (
    <div className={layoutStyle}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

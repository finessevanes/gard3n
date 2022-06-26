import Login from '../components/Login'

export default function Home() {

  const layoutStyle = `
  w-full
  h-screen
  `
  return (
    <div className={layoutStyle}>
      <Login/>
    </div>
  )
}

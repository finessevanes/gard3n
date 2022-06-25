import { useState, useEffect } from 'react'
import Profiles from './profiles'

export default function Home() {

  const Layout = ({ children }) => {
    const layoutStyle = `
    bg-lens-100
    h-screen
    `


    return (
      <div className={layoutStyle}>
        <main>{children}</main>
      </div>
    )
  }

  const Login = () => {
    const loginStyle = `
    bg-red-100
    flex
    `

    return (
      <div className={loginStyle}>
        <h1>Log in</h1>
        <button>Click me</button>
      </div>
    )
  };

  // const buttonStyle = `
  // bg-lens-200
  // hover:bg-green-900
  // text-white
  // py-2
  // px-4
  // rounded-full
  // `
  return (
    <>
      <Layout>
        <Login />
      </Layout>
    </>
  )
}

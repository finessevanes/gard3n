import { useState, useEffect } from 'react'
import Profiles from './profiles'

export default function Home() {

  const layoutStyle = `
  bg-lens-100
  h-screen
  flex
  `


  const buttonStyle = `
  bg-lens-200
  hover:bg-green-900
  text-white
  py-2
  px-4
  rounded-full
  `
  return (
    <div className={layoutStyle}>
      <button className={buttonStyle}>Connect Wallet</button>
    </div>
  )
}

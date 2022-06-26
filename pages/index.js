import { useState, useEffect } from 'react'
import Profiles from './profiles'
import Login from '../components/Login'

export default function Home() {

  const layoutStyle = `
  `
  return (
    <div className={layoutStyle}>
      <Login/>
    </div>
  )
}

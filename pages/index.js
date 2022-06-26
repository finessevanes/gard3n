import { useState, useEffect } from 'react'
import Profiles from './profiles'
import Login from '../components/Login'

export default function Home() {

  const layoutStyle = `
  flex
  `
  return (
    <div className="flex">
      <Login/>
    </div>
  )
}

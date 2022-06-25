import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from 'next/link';

export default function Home() {

  const Layout = ({ children }) => {

    return (
      <Container className="layout-container">
        <main>{children}</main>
      </Container>
    )
  }

  const Login = () => {

    return (
      <div className='login-container'>
        <h1>gard3n</h1>
        <Button variant="contained">Connect Wallet</Button>
        <Link href="/profile">
          <Button variant="contained">
            <a>Profile Example</a>
          </Button>
        </Link>
       
      </div>
    )
  };

  return (
    <>
      <Layout>
        <Login />
      </Layout>
    </>
  )
}

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Profiles from '../components/Profiles'
import Image from 'next/image'
import Wallet, { WalletConnect } from '../components/Wallet';
import { useWeb3React } from '@web3-react/core';

const Login = () => {
  const [currentAccount, setCurrentAccount] = useState("")
  const { activate } = useWeb3React()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const LoginStyle = `
  text-center
    `

  const ButtonStyle = `
    bg-lens-300
    hover:bg-green-600
    text-white
    py-3
    px-5
    rounded-full
    shadow-custom
    mt-40
    `

  const TitleStyle = `
    text-bold drop-shadow-xl
    text-4xl
    font-sans
    `

  return (
    <div className={LoginStyle}>
      {currentAccount ? (
        <Profiles />
      ) : (
        <div className='mt-80'>
          <Image src="/gard3n-logo.svg" height={300} width={300} alt="gard3n-logo" />
          <h1 className={TitleStyle}>gard3n</h1>
          <button className={ButtonStyle} onClick={() => { activate(WalletConnect)}}>
            WalletConnect
          </button>
          <button className={ButtonStyle} onClick={connectWallet}>Connect Wallet</button>
        </div>
      )
      }

    </div>
  )
};

export default Login

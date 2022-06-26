import { useState, useEffect } from 'react'
import Link from 'next/link'

const Login = () => {
    const [currentAccount, setCurrentAccount] = useState("");

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

    `

    const ButtonStyle = `
    bg-lens-200
    hover:bg-green-600
    text-white
    py-3
    px-5
    rounded-full
    drop-shadow-2xl
    mt-80
    `

    const TitleStyle = `
    text-bold drop-shadow-xl
    text-7xl
    font-sans
    mt-80
    `

    return (
      <>
        <h1 className={TitleStyle}>gard3n</h1>
        {currentAccount ? (
          <Link href="/profile">
            <button>
              <a>Profile Example</a>
            </button>
          </Link>
        ) : (
          <button className={ButtonStyle} onClick={connectWallet}>Connect Wallet</button>
        )

        }

      </>
    )
  };

  export default Login
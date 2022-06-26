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

    return (
      <div className=''>
        <h1>gard3n</h1>
        {currentAccount ? (
          <Link href="/profile">
            <button>
              <a>Profile Example</a>
            </button>
          </Link>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )

        }

      </div>
    )
  };

  export default Login
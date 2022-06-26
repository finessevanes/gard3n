import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { client, getProfiles, getPublications } from '../../api'
import Image from 'next/image';
import { api, utils } from "@epnsproject/frontend-sdk-staging";
import ABI from '../../abi.json'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Wallet, { WalletConnect } from '../../components/Wallet';
import { root } from 'postcss';

const CONTRACT_ADDRESS = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d'

function getLibrary(provider) {
  return new Web3Provider(provider);
}

export default function Profiles() {
  const [profile, setProfile] = useState()
  const [publications, setPublications] = useState([])
  const [account, setAccount] = useState('')
  const router = useRouter()
  const { id } = router.query

  const [notifications, setNotifications] = useState([])

  const { activate } = useWeb3React()


  useEffect(() => {
    if (id) {
      fetchProfile()
    }
  }, [id])

  async function epns() {
    // define the variables required to make a request
    const walletAddress = "0x8F52f8092f00D2594C020468FAd7E44AC78064CC";
    const pageNumber = 1;
    const itemsPerPage = 20;
    // define the variables required to make a request

    //fetch the notifications
    const fetchedNotifications = await api.fetchNotifications(walletAddress, itemsPerPage, pageNumber)
    console.log(fetchedNotifications.results)
    setNotifications(fetchedNotifications.results)
    //fetch the notifications


    //parse the notification fetched
    //const parsedResponse = utils.parseApiResponse(fetchedNotifications);
    //console.log(parsedResponse);

  }

  async function fetchProfile() {
    try {
      const returnedProfile = await client.query(getProfiles, { id }).toPromise();
      const profileData = returnedProfile.data.profiles.items[0]
      setProfile(profileData)

      const pubs = await client.query(getPublications, { id, limit: 50 }).toPromise()

      setPublications(pubs.data.publications.items)
    } catch (err) {
      console.log('error fetching profile...', err)
    }
  }

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    })
    console.log('accounts: ', accounts)
    accounts[0]
    setAccount(account)
  }

  function getSigner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    return provider.getSigner();
  }

  async function followUser() {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      getSigner()
    )

    try {
      const tx = await contract.follow([id], [0x0])
      await tx.wait()
      console.log(`successfully followed ... ${profile.handle}`)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  if (!profile) return null

  return (
    <div>
      <button
        onClick={() => {
          activate(WalletConnect)
          ;
        }}
        type='button'
        className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
      >
        WalletConnect
      </button>
      <button onClick={connectWallet} type='button'
        className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>Connect</button>
      {
        profile.picture ? (
          <img
            src={profile.picture?.original?.url || profile.picture.uri}
            alt={profile.handle}
            style={{ height: "200px", width: "200px" }}
          />
        ) : (
          <div style={{ width: '200px', height: '200px', backgroundColor: 'black' }}>
          </div>
        )
      }
      <h4>{profile.handle}</h4>
      <p>{profile.bio}</p>
      <p>Followers: {profile.stats.totalFollowers}</p>
      <p>Following: {profile.stats.totalFollowing}</p>
      <button onClick={followUser}>Follow</button>
      {
        publications.map((pub, i) => (
          <div key={i} style={{ padding: '20px', borderTop: '1px solid #ededed' }}>
            {pub.metadata.content}
          </div>
        ))
      }
      <div>
        <div>
          <button id="sdk-trigger-id" onClick={epns} type='button'
            className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>Subscribe to {profile.handle}'s EPNS</button>
        </div>
        <div>
          <>
            {notifications ?
              (notifications.map((n) => (
                <p key={n.payload_id}>EPNS Notification: {n.payload.notification.body}</p>
              ))) : (<p></p>)}
          </>
        </div>
      </div>
    </div>
  )
}
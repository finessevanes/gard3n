import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { client, getProfiles, getPublications } from '../../api'
import Image from 'next/image';
import ABI from '../../abi.json'
import { ethers } from 'ethers'

const CONTRACT_ADDRESS = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d'

export default function Profiles() {
    const [profile, setProfile] = useState()
    const [publications, setPublications] = useState([])
    const [account, setAccount] = useState('')
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
          fetchProfile()
        }
      }, [id])

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
            <button onClick={connectWallet}>Connect</button>
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
                    <div key={i} style={{ padding: '20px', borderTop: '1px solid #ededed'}}>
                        {pub.metadata.content}
                    </div>
                ))
            }
        </div>
    )
}
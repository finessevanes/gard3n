import { useState, useEffect } from "react";
import {
    client, getProfile
} from '../api'
import { ethers } from 'ethers'
import { EmbedSDK } from "@epnsproject/frontend-sdk-staging";
import { api, utils } from "@epnsproject/frontend-sdk-staging";
import ABI from '../abi.json'
const CONTRACT_ADDRESS = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d'
const id = '0x7a36'

export default function Profile() {
    const [profile, setProfile] = useState('');

    const [notifications, setNotifications] = useState([])


    useEffect(() => {
        fetchProfile()
    }, [profile])

    async function epns(){
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
            const res = await client.query(getProfile).toPromise()
            setProfile(res.data.profile)
            console.log(res.data.profile.handle.slice(0, -5))
        } catch (e) {
            console.log(e)
        }
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

    if (!profile) return;
    return (
        <div>
            
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
            <h4>{profile.handle.slice(0, -5)}</h4>
            <p>{profile.bio}</p>
            <p>Followers: 47k</p>
            <p>Following: 347</p>
            <button onClick={followUser}>Follow</button>
       
            
        </div>
        
    )
}
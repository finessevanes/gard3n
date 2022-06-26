/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { client, getProfiles, getPublications } from '../../api'
import { api, utils } from "@epnsproject/frontend-sdk-staging";
import Navigation from '../../components/Navigation';

export default function SelectedProfile() {
  const [profile, setProfile] = useState()
  const [publications, setPublications] = useState([])
  const router = useRouter()
  const { id } = router.query

  const [notifications, setNotifications] = useState([])

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

  if (!profile) return null

  const profileDetailStyle = `
  p-8
  bg-white
  shadow-custom
  rounded-lg
  w-10/12
  ml-8
  mr-16
  mb-8
  `
  const profilePublicationStyle = `
  m-4
  p-8
  bg-white
  shadow-custom
  rounded-lg
  w-10/12
  ml-8
  mr-16
  mb-6
  `

  const ButtonStyle = `
  bg-lens-300
  hover:bg-green-600
  text-white
  py-3
  px-5
  rounded-full
  shadow-custom
  `

  return (
    <div className='flex w-screen'>
      <Navigation />
      <div className='overflow-scroll h-screen'>
        <div className={profileDetailStyle}>
          <img
            src={profile.picture?.original?.url || profile.picture.uri}
            alt={profile.handle}
            className='h-40 w-40 rounded-full mb-3'
          />
          <h4>{profile.handle}</h4>
          <button
            id="sdk-trigger-id"
            onClick={epns}
            type='button'
            className={ButtonStyle}
          >
            Sign Up for EPNS
          </button>
          <p>{profile.bio}</p>
          <p>Followers: {profile.stats.totalFollowers}</p>
          <p>Following: {profile.stats.totalFollowing}</p>
        </div>
        {
          publications.map((pub, i) => (
            <div key={i} className={profilePublicationStyle}>
              {pub.metadata.content}
            </div>
          ))
        }
        {notifications ?
          (notifications.map((n) => (
            <p key={n.payload_id}>EPNS Notification: {n.payload.notification.body}</p>
          ))) : (<p></p>)}
      </div>
    </div>
  )
}
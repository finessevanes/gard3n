import { useState, useEffect } from 'react'
import {
  client, recommendProfiles
} from '../api'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from './Navigation'

export default function Profiles() {
  const [profiles, setProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const CONSTANT_BIO = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    try {
      const res = await client.query(recommendProfiles).toPromise()
      console.log('res in profiles', res)
      setProfiles(res.data.recommendedProfiles)
    } catch (e) {
      console.log(e)
    }
  }

  if (!profiles) return null

  const profileItemStyle = `
  m-4
  p-8
  bg-white
  shadow-custom
  rounded-lg
  w-10/12
  ml-8
  mr-16
  `



  return (
    <div className='flex'>
      <Navigation />
      <div>
      {
        profiles.map((profile, i) => (
          <Link key={i} href={`/profile/${profile.id}`}>
            <a>
              <div className={profileItemStyle}>
                {
                  profile.picture ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.picture?.original?.url || profile.picture.uri}
                      alt={profile.handle}
                      className='h-20 w-20 rounded-full mb-3'
                    />
                  ) : (
                    <div className='h-20 w-20 rounded-full bg-gray-500'>
                    </div>
                  )
                }
                <h4>{profile.handle}</h4>
                <p className='text-xs'>{profile.bio ? profile.bio : CONSTANT_BIO}</p>
              </div>
            </a>
          </Link>
        ))
      }
      </div>
    </div>
  )
}

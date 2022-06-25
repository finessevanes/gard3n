import { useState, useEffect } from 'react'
import {
  client, recommendProfiles
} from '../api'
import Link from 'next/link'
import Image from 'next/image'

export default function Profiles() {
  const [profiles, setProfiles] = useState([])
  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    try {
      const res = await client.query(recommendProfiles).toPromise()
      setProfiles(res.data.recommendedProfiles)
    } catch (e) {
      console.log(e)
    }
  }

  if (!profiles) return null

  return (
    <div>
      {
        profiles.map((profile, i) => (
          <Link key={i} href={`/profile/${profile.id}`}>
            <a>
              <div>
                {
                  profile.picture ? (
                    <img
                      src={profile.picture?.original?.url || profile.picture.uri}
                      alt={profile.handle}
                      style={{ height: "60px", width: "60px" }}
                    />
                  ) : (
                    <div style={{ width: '60px', height: '60px', backgroundColor: 'black' }}>
                    </div>
                  )
                }
                <h4>{profile.handle}</h4>
                <p>{profile.bio}</p>
              </div>
            </a>
          </Link>
        ))
      }
    </div>
  )
}

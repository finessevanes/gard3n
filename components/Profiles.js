import { useState, useEffect } from 'react'
import {
  client, recommendProfiles
} from '../api'
import Link from 'next/link'

export default function Profiles() {
  const [profiles, setProfiles] = useState([])
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
  `

  return (
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

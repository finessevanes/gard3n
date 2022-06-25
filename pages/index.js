import { useState, useEffect } from 'react'
import {
  client, recommendProfiles
} from '../api'
import Link from 'next/link'

export default function Home() {
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
  
  return (
    <div>
      {
        profiles.map((profile, i) => (
          <Link href={`/profile/${profile.id}`} key={i}>
            <a>
              <div>
                <h1>{profile.name}</h1>
                <p>{profile.bio}</p>
              </div>
            </a>
          </Link>
        ))
      }
    </div>
  )
}

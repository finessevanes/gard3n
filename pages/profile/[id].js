import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { client, getProfiles } from '../../api'
import Image from 'next/image';

export default function Profiles() {
    const [profile, setProfile] = useState()
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            fetchProfile()
        }
    }, [id])

    async function fetchProfile() {
        try {
            const res = await client.query(getProfiles, { id }).toPromise()
            console.log(res)
            setProfile(res.data.profiles.items[0])
        } catch (e) {
            console.log(e)
        }
    }

    if (!profile) return null

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
            <h4>{profile.handle}</h4>
            <p>{profile.bio}</p>
            <p>Followers: {profile.stats.totalFollowers}</p>
        </div>
    )
}
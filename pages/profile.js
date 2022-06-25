import { useState, useEffect } from "react";
import {
    client, getProfile
  } from '../api'

export default function Profile(){

    useEffect(() => {
        fetchProfile()
    }, [])

    async function fetchProfile(){
        try {
            const res = await client.query(getProfile).toPromise()
            console.log(res)
        } catch(e){
            console.log(e)
        }
    }
    return(
        <h1>Profile</h1>
    )
}
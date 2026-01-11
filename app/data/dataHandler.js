 'use client'

import { useContext } from "react"
import { GlobalContext } from "../context/context"
import { getProfileRequest } from "./userProfileData"



const errorStatusHandler = (response) =>{
    switch (response.status) {
        case 200:    
        break
        case 401:
            console.log('unlogged')
            break
        case 403:
            console.log('access blocked')
            break
        default:
            throw new Error(`status error. status: ${response.status}`)

    }
}

const setResult = (data, status)=>{
    return {
        body: data,
        status:status
    }
}

export  {
setResult,
errorStatusHandler
}


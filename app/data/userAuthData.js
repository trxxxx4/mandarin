'use client'
import { useContext } from "react"
import { GlobalContext } from "../context/context"
import { route } from "./route"

const deleteAuthInfo = async ()=>{
  
}

const postAuthInfo = async (username, password) => {
      const currentTime = new Date()
      const reqForm = {
      username: username,
      password: password,
      registrationTime: currentTime
      }
      
      console.log(currentTime) 
    try {
      const response = await fetch(`${route}/api/authentication/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqForm)
      

      })
      
      if (!response.ok) { throw new Error(`HTTP ${response.status}`) }
      const data = await response.json()
      console.log(data)
      return data

    } catch (error) { console.log(error) }

  }

const postRegistrationInfo = async (username, password) => {
      const currentTime = new Date()
      const reqForm = {
      username: username,
      password: password,
      registrationTime: currentTime
      }
      
      console.log(currentTime) 
    try {
      const response = await fetch(`${route}/api/authentication/registration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqForm)
      

      })
      
      if (!response.ok) { throw new Error(`HTTP ${response.status}`) }
      const data = await response.json()
      console.log(data)
      return data

    } catch (error) { console.log(error) }

  }




const getAuthInfo = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth')
      if (!response.ok){ throw new Error('HTTP ERROR')}
      const data = await response.json()
      return data
    } catch (e) { error.log(e) }

  }
export {
      getAuthInfo,
      deleteAuthInfo,
      postAuthInfo,
      postRegistrationInfo
}
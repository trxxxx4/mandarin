'use client'
import '../globals.css'
import { createContext } from "react";
import { useEffect, useState } from "react";


export const InterfaceContext = createContext()



export function InterfaceProvider({children}){
  
    let [authtorizationBgSideIndex, setAutorizationBgSideIndex] = useState(null)


  let [onLogoutForAuthtorizationLoaderStatus, setOnLogoutForAuthtorizationLoaderStatus] = useState(false)


let [logoutSuccessNotificationStatus, setLogoutSuccessNotificationStatus] = useState(false)
let [authSuccessNotificationStatus, setAuthSuccessNotificationStatus] = useState(false)   
  let [volumeNotificationStatus, setVolumeNotificationStatus] = useState(false)
  let [formNotificationStatus, setFormNotificationStatus] = useState(false)
  let [deleteErrorNotificationStatus, setDeleteErrorNotificationStatus] = useState(false)
  let [registrationNotSuccessNotificationStatus, setRegistrationNotSuccessNotificationStatus] = useState(false)    
  let [registrationSuccessNotificationStatus, setRegistrationSuccessNotificationStatus] = useState(false)
  let [authNotSuccessNotificationStatus, setAuthNotSuccessNotificationStatus] = useState(false)
  let [authtorizationFormNotification, setAuthtorizationFormNotification]= useState(false)
  

    return (
    <InterfaceContext.Provider value={{
      logoutSuccessNotificationStatus,
        authSuccessNotificationStatus,
        authNotSuccessNotificationStatus,
        registrationSuccessNotificationStatus,
        registrationNotSuccessNotificationStatus,  
      
  
        setLogoutSuccessNotificationStatus,
        setAuthSuccessNotificationStatus,
        setAuthNotSuccessNotificationStatus,
        setRegistrationSuccessNotificationStatus,
        setRegistrationNotSuccessNotificationStatus,


        volumeNotificationStatus, setVolumeNotificationStatus,
        formNotificationStatus, setFormNotificationStatus,
        deleteErrorNotificationStatus, setDeleteErrorNotificationStatus,
        authtorizationFormNotification, setAuthtorizationFormNotification,
      onLogoutForAuthtorizationLoaderStatus, setOnLogoutForAuthtorizationLoaderStatus
        }}>
      {children}
    </InterfaceContext.Provider>
    )
}
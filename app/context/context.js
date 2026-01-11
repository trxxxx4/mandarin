'use client'
import '../globals.css'
import { createContext } from "react";
import { useEffect, useState } from "react";
import { getAuthInfo, postAuthInfo } from "..";

export const GlobalContext = createContext()



export function GlobalProvider({children}){
    const [token, setToken] = useState(null)
    const [userName, setUserName] = useState('')
    const [globalAuthStatus, setGlobalAuthStatus] = useState(null)
    const login = (username, token) =>{
        console.log('login')
        window.localStorage.setItem('username',username)
        window.localStorage.setItem('globalAuthStatus','authed')
        setGlobalAuthStatus('authed')
        window.localStorage.setItem('token',token)
        setUserName(username)
        window.localStorage.setItem('username',username)
    }
    
    const logout = ()=>{
        window.localStorage.removeItem('globalAuthStatus')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username')
        setGlobalAuthStatus('notAuthed')
        setUserName('')
    }

    

    useEffect(()=>{
        if (typeof window !== "undefined"){
            console.log('window is available')
            if (window.localStorage.getItem('globalAuthStatus')=='authed'){
                setGlobalAuthStatus('authed')
                setUserName(window.localStorage.getItem('username'))
                
                
            }else{
                setGlobalAuthStatus('notAuthed')

            }
        }
        
    },[])
    
    





    return (
    <GlobalContext.Provider value={{userName, globalAuthStatus, login,
            logout,
            
        }}>
      {children}
    </GlobalContext.Provider>
    )
}
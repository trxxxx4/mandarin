'use client'
import { useEffect, useState } from "react"
import { postAuthInfo } from "../data/userAuthData"
import { useContext } from "react"
import { GlobalContext } from "../context/context"
import { isNotEmpty } from "../profile/page"
import { loadTokenData } from "../data/dataHandler"
import styles from './auth.module.css'
export default function Home() {
  let [status, setStatus] = useState(null)
  let [usernameAuth, setUsernameAuth] = useState('')
  let [passwordAuth, setPasswordAuth] = useState('')
  let [usernameRegistration, setUsernameRegistration] = useState('')
  let [passwordRegistration, setPasswordRegistration] = useState('')

  const { login, logout, globalAuthStatus } = useContext(GlobalContext)

  useEffect(() => {
          loadTokenData()
      }, [])


  const handleLogout = () => {
    logout()
  }

  const handleRegistrationCheckForm = async () => {
    if (isNotEmpty(usernameRegistration) && isNotEmpty(passwordRegistration)) {

      const checkResponse = await postAuthInfo('registration', usernameRegistration, passwordRegistration)

    }
  }






  const handleAuthCheckForm = async () => {
    if (isNotEmpty(usernameAuth) && isNotEmpty(passwordAuth)) {

      
      
      const response = await postAuthInfo('auth', usernameAuth, passwordAuth)
      if (response.status == 'authed') {
        login(response.username, response.token)
      } if (response.status == 'notAuthed') {
        console.log('notAuthed')
      }
    }
  }

  const handleSetValue = (e) => {
    switch (e.target.name) {
      case "usernameAuth": setUsernameAuth(e.target.value)
        console.log(`username auth ${e.target.value}`)
        break;
      case "passwordAuth": setPasswordAuth(e.target.value)
        console.log(`password auth ${e.target.value}`)
        break;
      case "usernameRegistration": setUsernameRegistration(e.target.value)
        console.log(`username reg ${e.target.value}`)
        break;
      case "passwordRegistration": setPasswordRegistration(e.target.value)
        console.log(`password reg ${e.target.value}`)
        break;

    }


  }
  return (
    <div className={styles.main__wrapper}>
      <div className={styles.main__container}>
        <ul>
          <li><a href='./profile'>D</a></li>

        </ul>
        <div className={styles.authContainer__wrapper}>

          {(() => {
            if (globalAuthStatus == 'authed') {
              return (
                <>
                  <h1>
                    Вы авторизованы
                  </h1>
                  <h1 onClick={handleLogout}>Logout</h1>
                </>)

            } else if (globalAuthStatus == 'notAuthed' || globalAuthStatus == null || globalAuthStatus == 'reAuth') {
              return (
                <>
                  <div className={styles.authPole__wrapper}>
                    <form className={styles.authPole__form}>
                      <h2>authtorization</h2>
                      <input name='usernameAuth' onChange={((e) => handleSetValue(e))} className={styles.input}></input>
                      <input name='passwordAuth' onChange={(e) => handleSetValue(e)} className={styles.input}></input>
                      <div onClick={handleAuthCheckForm}>Click</div>
                    </form></div>
                  <div className={styles.authPole__wrapper}>
                    <form className={styles.authPole__form}>
                      <h2>registration</h2>
                      <input name='usernameRegistration' onChange={((e) => handleSetValue(e))} className={styles.input}></input>
                      <input name='passwordRegistration' onChange={(e) => handleSetValue(e)} className={styles.input}></input>
                      <div onClick={handleRegistrationCheckForm}>Click</div>
                    </form></div>
                </>

              )
            }
          })()}


        </div>

      </div>
    </div>
  )
}
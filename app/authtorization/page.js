'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { postAuthInfo, postRegistrationInfo } from "../data/userAuthData"
import { useContext, useRef } from "react"
import { GlobalContext } from "../context/context"
import { InterfaceContext } from '../context/interfaceContext'
import { isNotEmpty } from '../interfaceTools/interfaceTools'
import styles from './auth.module.css'
import Loader from '../components/loader/Loader'
export default function Home() {
  const router = useRouter()
  const authBgRef = useRef(null)
  const authContainerWrapper = useRef(null)
  let authFormIndex1 = useRef(null)
  let authFormIndex0 = useRef(null)
  let [usernameAuth, setUsernameAuth] = useState('')
  let [passwordAuth, setPasswordAuth] = useState('')
  let [usernameRegistration, setUsernameRegistration] = useState('')
  let [passwordRegistration, setPasswordRegistration] = useState('')



let [loaderStatus, setLoaderStatus] = useState(null)

  const { login, logout, globalAuthStatus } = useContext(GlobalContext)

  const {setLogoutSuccessNotificationStatus,
        setAuthSuccessNotificationStatus,
        setAuthNotSuccessNotificationStatus,
        setRegistrationSuccessNotificationStatus,
        setRegistrationNotSuccessNotificationStatus,
      setAuthtorizationFormNotification} = useContext(InterfaceContext)

   


  const handleLogout = () => {
    logout()
  }

  const handleRegistrationCheckForm = async () => {
    if (isNotEmpty(usernameRegistration) && isNotEmpty(passwordRegistration)) {

      const response = await postRegistrationInfo(usernameRegistration, passwordRegistration)
      if (response.status == 'registrationSuccess') {
        changeSide(1)
        setRegistrationSuccessNotificationStatus(null)
        setTimeout(()=>{
          setRegistrationSuccessNotificationStatus(true)
        },1)

      } else if (response.status == 'registrationNotSuccess') {
        setRegistrationNotSuccessNotificationStatus(null)
        setTimeout(()=>{
          setRegistrationNotSuccessNotificationStatus(true)
        },1)
      }
    }else{
      setAuthtorizationFormNotification(null)
      setTimeout(()=>{
        setAuthtorizationFormNotification(true)
      },1)
    }
  }






  const handleAuthCheckForm = async () => {
    if (isNotEmpty(usernameAuth) && isNotEmpty(passwordAuth)) {
      const response = await postAuthInfo(usernameAuth, passwordAuth)
      if (response.status == 'authed') {
        login(response.username, response.token)
        setLoaderStatus(true)
        setAuthSuccessNotificationStatus(null)
        setTimeout(()=>{
          setAuthSuccessNotificationStatus(true)
        },1)
        router.push('/')

      } if (response.status == 'notAuthed') {
        console.log('notAuthed')
        
        setAuthNotSuccessNotificationStatus(null)
        setTimeout(()=>{
          setAuthNotSuccessNotificationStatus(true)
        },1)
      }
    }else{
      setAuthtorizationFormNotification(null)
      setTimeout(()=>{
        setAuthtorizationFormNotification(true)
      },1)
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

  const authBgSideIndexList = [
    styles.auth__bg__sideIndex0,
    styles.auth__bg__sideIndex1
  ]
  const authFormIndexList = [
    authFormIndex1,
    authFormIndex0

  ]

 

  const setBgSide = (settingBgSideIndex) => {
    
    
    authBgRef.current.className = `${styles.auth__bg} ${authBgSideIndexList[settingBgSideIndex]}`
    authFormIndexList[settingBgSideIndex].current.reset()
  }


  return (
    <div className={styles.main__wrapper}>
      <div className={styles.main__container}>
        {(() => {
          if (globalAuthStatus == 'notAuthed') {
            return (
              <div ref={authContainerWrapper} className={`${styles.authContainer__wrapper}`}>
                <div ref={authBgRef} className={`${styles.auth__bg}`}></div>
                <div className={styles.authPole__wrapper}>
                  <form ref={authFormIndex0} className={styles.authPole__form}>
                    <h2 className={styles.authPole__form__title}>Авторизация</h2>
                    <div className={styles.authPole__form__textarea}>
                      <input placeholder='Логин' name='usernameAuth' onChange={((e) => handleSetValue(e))} className={styles.input}></input>
                      <input placeholder='Пароль' name='passwordAuth' onChange={(e) => handleSetValue(e)} className={styles.input}></input>

                    </div>
                    <div className={styles.authPole__form__confirmButton} onClick={handleAuthCheckForm}>
                      <h2 className={styles.authPole__form__confirmButton__title}>Продолжить</h2>
                    </div>
                  </form>
                  <div className={styles.changeSide__button} onClick={() => setBgSide(0)} >
                    <h2 className={styles.changeSide__button__title}>Перейти к регистрации</h2>
                  </div>
                </div>
                <div className={styles.authPole__wrapper}>

                  <form ref={authFormIndex1} className={styles.authPole__form}>
                    <h2 className={styles.authPole__form__title}>Регистрация</h2>
                    <div className={styles.authPole__form__textarea}>
                      <input placeholder='Логин' name='usernameRegistration' onChange={((e) => handleSetValue(e))} className={styles.input}></input>
                      <input placeholder='Пароль' name='passwordRegistration' onChange={(e) => handleSetValue(e)} className={styles.input}></input>

                    </div>
                    <div className={`${styles.authPole__form__confirmButton} ${styles.authPole__form__confirmButton__color2}`} onClick={handleRegistrationCheckForm}>
                      <h2 className={styles.authPole__form__confirmButton__title}>Продолжить</h2>
                    </div>
                  </form>

                  <div onClick={() => setBgSide(1)} className={styles.changeSide__button}>
                    <h2 className={styles.changeSide__button__title}>Перейти к авторизации</h2>
                    </div>
                </div>

              </div>
            )
          } else if (globalAuthStatus == 'authed') {
            return (
              <div>
                <h2>Вы уже авторизованы</h2>

              </div>

            )
          }
        })()}

        

{(()=>{
  if (loaderStatus==true){
    return (
      <Loader></Loader>
    )
  }
})()}


      </div>
    </div>
  )
}
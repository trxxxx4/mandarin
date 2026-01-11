'use client'

import { useContext, useEffect } from "react"
import { InterfaceContext } from "@/app/context/interfaceContext"
import styles from './notification.module.css'
export default function Notification(){
    
      const {authSuccessNotificationStatus, setAuthSuccessNotificationStatus } = useContext(InterfaceContext)
       // для регистрации ответ: authed
        useEffect(() => {
          console.log(authSuccessNotificationStatus)
          const timer = setTimeout(()=>{
            setAuthSuccessNotificationStatus(false)
          },4000)
          return ()=> clearTimeout(timer)
        }, [authSuccessNotificationStatus])


        const {logoutSuccessNotificationStatus, setLogoutSuccessNotificationStatus } = useContext(InterfaceContext)
      // для logout 
        useEffect(() => {
          console.log(logoutSuccessNotificationStatus)
          const timer = setTimeout(()=>{
            setLogoutSuccessNotificationStatus(false)
          },4000)
          return ()=> clearTimeout(timer)
        }, [logoutSuccessNotificationStatus])

        const {authNotSuccessNotificationStatus,setAuthNotSuccessNotificationStatus  } = useContext(InterfaceContext)
        // для auth response: notAuthed
  useEffect(() => {
    console.log(authNotSuccessNotificationStatus)
    const timer = setTimeout(()=>{
      setAuthNotSuccessNotificationStatus(false)
    },4000)
    return ()=> clearTimeout(timer)
  }, [authNotSuccessNotificationStatus])

  const {registrationSuccessNotificationStatus, setRegistrationSuccessNotificationStatus} = useContext(InterfaceContext)
    // для регистрации ответ : success
      useEffect(() => {
        console.log(registrationSuccessNotificationStatus)
        const timer = setTimeout(()=>{
          setRegistrationSuccessNotificationStatus(false)
        },4000)
        return ()=> clearTimeout(timer)
      }, [registrationSuccessNotificationStatus])

      const {registrationNotSuccessNotificationStatus, setRegistrationNotSuccessNotificationStatus } = useContext(InterfaceContext)
      // для регистрации ответ: Not success
  useEffect(() => {
    console.log(registrationNotSuccessNotificationStatus)
    const timer = setTimeout(()=>{
      setRegistrationNotSuccessNotificationStatus(false)
    },4000)
    return ()=> clearTimeout(timer)
  }, [registrationNotSuccessNotificationStatus])

  const {volumeNotificationStatus, setVolumeNotificationStatus } = useContext(InterfaceContext)
      // для формы что объем это число
    useEffect(() => {
        console.log(volumeNotificationStatus)
        const timer = setTimeout(() => {
            setVolumeNotificationStatus(false)
        }, 4000)
        return () => clearTimeout(timer)
    }, [volumeNotificationStatus])

const {formNotificationStatus, setFormNotificationStatus } = useContext(InterfaceContext)
    // для формы если пустые поля
    useEffect(() => {
        console.log(formNotificationStatus)
        const timer = setTimeout(() => {
            setFormNotificationStatus(false)
        }, 4000)
        return () => clearTimeout(timer)
    }, [formNotificationStatus])

    const {deleteErrorNotificationStatus,  setDeleteErrorNotificationStatus} = useContext(InterfaceContext)
    // для формы нечего удалять
    useEffect(() => {
        console.log(deleteErrorNotificationStatus)
        const timer = setTimeout(() => {
            setDeleteErrorNotificationStatus(false)
        }, 4000)
        return () => clearTimeout(timer)
    }, [deleteErrorNotificationStatus])

   
      const {authtorizationFormNotification, setAuthtorizationFormNotification } = useContext(InterfaceContext)
       // для регистрации не все поля
        useEffect(() => {
          console.log(authtorizationFormNotification)
          const timer = setTimeout(()=>{
            setAuthtorizationFormNotification(false)
          },4000)
          return ()=> clearTimeout(timer)
        }, [authtorizationFormNotification])




    
    return (
        <>
        
        {(() => {
          if (authSuccessNotificationStatus == true) {
            return (
              <div className={`${styles.notification} ${styles.notification__color1}`}>
                <h3 className={styles.notification__title}>Вы успешно авторизованы</h3>
              </div>
            )
          }
        })()}

    {(() => {
          if (logoutSuccessNotificationStatus == true) {
            return (
              <div className={`${styles.notification} ${styles.notification__color1}`}>
                <h3 className={styles.notification__title}>Вы вышли из учётной записи</h3>
              </div>
            )
          }
        })()}



        {(() => {
          if (registrationNotSuccessNotificationStatus == true) {
            return (
              <div className={`${styles.notification} }`}>
                <h3 className={styles.notification__title}>Такой аккаунт уже существует</h3>
              </div>
            )
          }
        })()}

        {(() => {
          if (registrationSuccessNotificationStatus == true) {
            return (
              <div className={`${styles.notification} }`}>
                <h3 className={styles.notification__title}>Пользователь зарегестрирован</h3>
              </div>
            )
          }
        })()}

        
        {(() => {
          if (authNotSuccessNotificationStatus == true) {
            return (
              <div className={`${styles.notification} }`}>
                <h3 className={styles.notification__title}>Неверный логин или пароль</h3>
              </div>
            )
          }
        })()}

        {(() => {
                    if (authtorizationFormNotification == true) {
                        return (
                            <div className={`${styles.notification} }`}>
                                <h3 className={styles.notification__title}>Заполните оба поля</h3>
                            </div>
                        )
                    }
                })()}


                {(() => {
                    if (deleteErrorNotificationStatus == true) {
                        return (
                            <div className={`${styles.notification} }`}>
                                <h3 className={styles.notification__title}>Нет карточек чтобы удалять</h3>
                            </div>
                        )
                    }
                })()}

                {(() => {
                    if (formNotificationStatus == true) {
                        return (
                            <div className={`${styles.notification} }`}>
                                <h3 className={styles.notification__title}>Заполните все поля</h3>
                            </div>
                        )
                    }
                })()}

                {(() => {
                    if (volumeNotificationStatus == true) {
                        return (
                            <div className={`${styles.notification} }`}>
                                <h3 className={styles.notification__title}>Объём продукта должен быть числом</h3>
                            </div>
                        )
                    }
                })()}

        
        
        </>

    )


}
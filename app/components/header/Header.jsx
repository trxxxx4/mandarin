'use client'
import { GlobalContext } from '@/app/context/context'
import styles from './header.module.css'
import { useContext } from 'react'

export default function Header(){
const {globalAuthStatus,userName, logout} = useContext(GlobalContext)
const handleLogout = () => {
    logout()
  }    
return (
        <div className={styles.header__wrapper}>
<ul className={styles.header}>
    <li className={styles.header__li}>Raspizdyai</li>
    {(()=>{
if (globalAuthStatus=='authed'){
    return (
        <>
        <li className={styles.header__li}>Profile: {userName}</li>
        <li className={styles.header__li} onClick={handleLogout}>Logout</li>
        </>
    )
} else return (<a className={styles.header__a} href='./auth'><li className={styles.header__li}>Registration</li></a>
)
    })()}
</ul>
        </div>
    )
}
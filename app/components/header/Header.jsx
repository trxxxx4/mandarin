'use client'
import { GlobalContext } from '@/app/context/context'
import styles from './header.module.css'
import { useContext, useEffect } from 'react'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { InterfaceContext } from '@/app/context/interfaceContext'
import Link from 'next/link'
export default function Header(){
    const router = useRouter()
    const headerBg0Ref = useRef(null)
    const headerBg1Ref = useRef(null)

        
    
    const {globalAuthStatus,userName, logout} = useContext(GlobalContext)
    const {setOnLogoutForAuthtorizationLoaderStatus} = useContext(InterfaceContext)
const pathname = usePathname()


    const handleLogout = () => {
    logout()
    setOnLogoutForAuthtorizationLoaderStatus(true)
    router.push('/')
  }    

  const headerStylesFromAuthtorizationBgSideIndex =[
    styles.header__style__dependingOn__bg__index0,
    styles.header__style__dependingOn__bg__index1
  ]




return (
        <div  className={styles.header__wrapper}>
        
        <ul className={styles.header}>
    
    {(()=>{
        if (pathname=='/'){
            return (
               <li className={styles.header__li}>Mandarin</li>
            )
        }else {
            return (
                <Link  className={styles.header__a} href="/"><li className={styles.header__li}>Mandarin</li></Link>
            )
        }
    })()}

    {(()=>{
        if (globalAuthStatus=='authed'){
            if (pathname != '/profile'){
                return(
                 <>  
                <Link className={styles.header__a} href='./profile'><li className={styles.header__li}>Profile: {userName}</li></Link>
                
                </> 
            )
            }
        return (<li className={styles.header__li} onClick={handleLogout}>Logout</li>)        
        }
        else if (globalAuthStatus=='notAuthed'){
            if (pathname!='/authtorization'){
                return (<Link className={styles.header__a} href='./authtorization'><li className={styles.header__li}>Registration</li></Link>)
            }
        }
    
    
    
    })()}
</ul>
        </div>
    )
}
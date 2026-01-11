'use client'
import { useEffect, useContext, useState } from 'react'
import styles from './popup.module.css'
import { InterfaceContext } from '@/app/context/interfaceContext'
export default function Popup(
    { children, setLogicPopupStatus }
) {
    
    


    const handleCancelButton = ()=>{
        setLogicPopupStatus(false)
    }

    return (
        <div className={styles.popup__wrapper}>
            <div className={styles.popup__container}>

                <div className={styles.popup__pole__wrapper}>
                    
                    
                    <div className={styles.popup__pole__cancelButton} onClick={() => { handleCancelButton()}}>
                    </div>
                    {children}


                {/* тут {children} */}


                </div>



            </div>

        </div>
    )
}
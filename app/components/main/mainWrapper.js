'use client'
import styles from './mainWrapper.module.css'
export default function MainWrapper({children}){
    


    return (
        <main  className={styles.main}>
            {children}
        </main>
    )
}
'use client'

import styles from './page.module.css'
export default function Home() {


  return (
    <>
    <div className={styles.main__wrapper}>
      <div className={styles.main}>
        <div className={styles.main__grid__container}>
          <span className={styles.main__grid__container__span}>М</span>
          <span className={styles.main__grid__container__span}>А</span>
          <span className={styles.main__grid__container__span}>Н</span>
          <span className={styles.main__grid__container__span}>Д</span>
          <span className={styles.main__grid__container__span}>А</span>
          <span className={styles.main__grid__container__span}>Р</span>
          <span className={styles.main__grid__container__span}>И</span>
          <span className={styles.main__grid__container__span}>Н</span>
        </div>
      </div>
    </div>

    
</>
  )
}
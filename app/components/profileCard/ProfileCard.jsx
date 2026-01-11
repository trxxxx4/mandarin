'use client'
import styles from './profilecard.module.css'
import { Base64ImageView } from '../../interfaceTools/interfaceTools.js';
export default function ProfileCard(
    {item, setChangePopupStatus, handleOpenChangePopup}
) {

    const handleCardOpenChangePopup = ()=>{
        setChangePopupStatus(true)
        handleOpenChangePopup(item)
    }

    return (

        <div key={item.id} className={styles.card}>
            <Base64ImageView base64String={item.productImage} className={styles.card__image}/>
            <h1 className={styles.card__h1}>{item.title}</h1>
            <h3 className={styles.card__h3}>{item.description}</h3>
            <h3 className={styles.card__h3}>{item.composition}</h3>
            <h3 className={styles.card__h3}>{item.volume}</h3>

            <h2 className={styles.card__h3} onClick={() => { handleCardOpenChangePopup()}}>
                Change info
            </h2>
        </div>

    )
}
'use client'
import styles from './profile.module.css'
import { useRef } from "react"
import Popup from '../components/popup/Popup.jsx'
import Loader from '../components/loader/Loader'
import { useState, useEffect } from "react"
import { useContext } from "react"
import { InterfaceContext } from '../context/interfaceContext'
import { GlobalContext } from "../context/context"
import { Base64ImageView, isNotEmpty } from '../interfaceTools/interfaceTools.js'
import { deleteProfileCardsRequest, postProfileCardsRequest, 
    getProfileCardsRequest, getProfileRequest,
    updateProfileCardsRequest
    } from '../data/userProfileData'
import ProfileCard from '../components/profileCard/ProfileCard'



export default function Profile() {

    const imageInput = useRef(null)
    const formRef = useRef(null)

    const {setVolumeNotificationStatus,setFormNotificationStatus, setDeleteErrorNotificationStatus,
        onLogoutForAuthtorizationLoaderStatus, setOnLogoutForAuthtorizationLoaderStatus} = useContext(InterfaceContext)
    let [deletePopupStatus, setDeletePopupStatus] = useState(null)
    let [changePopupStatus, setChangePopupStatus] = useState(null)
    


    let [cardsList, setCardsList] = useState([])
    let [title, setTitle] = useState('')
    let [volume, setVolume] = useState(0)
    let [description, setDescription] = useState('')
    let [composition, setComposition] = useState('')
    let [profileInterfaceStatus, setProfileInterfaceStatus] = useState(null)
    let [previewImage, setPreviewImage] = useState(null)
    let [selectedFile, setSelectedFile] = useState(null)
    let [profileInputsStatus, setProfileInputsStatus] = useState(null)
    let [idFromResponse, setIdFromResponse] = useState(null)
    let [userRoleFromResponse, setRoleFromResponse] = useState(null)
    let [usernameFromResponse, setUsernameFromResponse] = useState(null)
    




    let [loaderStatus, setLoaderStatus] = useState(null)


    let textareaRef1 = useRef(null)
    let textareaRef2 = useRef(null)
    let textareaRef3 = useRef(null)
    let textareaRef4 = useRef(null)

    let changeTextareaRef1 = useRef(null)
    let changeTextareaRef2 = useRef(null)
    let changeTextareaRef3 = useRef(null)
    let changeTextareaRef4 = useRef(null)
    let [changeTitle, setChangeTitle] = useState('')
    let [changeVolume, setChangeVolume] = useState(0)
    let [changeDescription, setChangeDescription] = useState('')
    let [changeComposition, setChangeComposition] = useState('')
    let [changePreviewImage, setChangePreviewImage] = useState(null)
    let [changeSelectedFile, setChangeSelectedFile] = useState(null)
    const changeImageInput = useRef(null)
    const changeFormRef = useRef(null)
    let [changeCardId, setChangeCardId] = useState(null)


    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const profileResponse = await getProfileRequest()

                const profileGetCardsResponse = await getProfileCardsRequest()

                const responseCardsListHandler = await responseStatusHandler(profileGetCardsResponse)
                if (responseCardsListHandler == true) {
                    setProfileInputsStatus(true)
                    setCardsList(profileGetCardsResponse.body)
                } else {
                    setProfileInputsStatus(false)
                }

                const profileResponseHandler = await responseStatusHandler(profileResponse)
                if (profileResponseHandler == true) {
                    setUsernameFromResponse(profileResponse.body.username)
                    setIdFromResponse(profileResponse.body.id)
                    setRoleFromResponse(profileResponse.body.role)
                } else {
                    setProfileInterfaceStatus(false)
                }


            } catch (error) {
                console.error(error)
            }
        }
        loadProfileData()
    }, [])
    useEffect(() => {
        console.log(selectedFile)
    }, [selectedFile])

    useEffect(()=>{
        return () =>{
            setOnLogoutForAuthtorizationLoaderStatus(false)
        }
    },[])

    useEffect(()=>{
        if (changePopupStatus==false){
            resetChangeValues()
        }
    }, [changePopupStatus])

    const responseStatusHandler = async (response) => {
        console.log(response)
        switch (response.status) {
            case 200:
                setProfileInterfaceStatus(true)

                return true

            case 401:

                logout()
                return false

            case 403:
                setProfileInterfaceStatus(true)
                console.log('access blocked')
                return false

            default:
                throw new Error(`status error. status: ${response.status}`)

        }

    }
    const { login, logout, globalAuthStatus } = useContext(GlobalContext)






    const handleDelete = async () => {
        const response = await deleteProfileCardsRequest()
        const responseHandler = (await responseStatusHandler(response))
        if (responseHandler == true) {
            setProfileInputsStatus(true)
            console.log(response.body)
            setCardsList(response.body)
        } else {
            setProfileInputsStatus(false)
        }
    }

    const resetChangeValues = ()=>{
        setChangeSelectedFile(null)
        setChangePreviewImage(null)
        setChangeCardId(null)
        setChangeComposition("")
        setChangeDescription('')
        setChangeTitle('')
        setChangeVolume(0) 
        
    }

    const setChangeImageLogic = (image) => {
        console.log(image)
        setChangeSelectedFile(image)
        const changePreviewUrl = URL.createObjectURL(image)
        setChangePreviewImage(changePreviewUrl)
        
        
    }
    const changeImageInputHandle = () => {
        changeImageInput.current?.click()
    }

    const handleOpenChangePopup = (item) =>{
        setChangeCardId(item.id)
        setChangeTitle(item.title)
        setChangeVolume(item.volume)
        setChangeComposition(item.composition)
        setChangeDescription(item.description)
        setChangeSelectedFile(item.productImage)
    }

    const setImageLogic = (image) => {
        console.log(image)
        setSelectedFile(image)
        const previewUrl = URL.createObjectURL(image)
        setPreviewImage(previewUrl)
    }
    const imageInputHandle = () => {
        imageInput.current?.click()
    }
    

    const changeTextareaHeight = (textareaRef) => {
        
        if (textareaRef != null) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }
    const handleSetValue = (e) => {
        switch (e.target.name) {
            case "titleInput": setTitle(e.target.value)
                console.log(`title ${e.target.value}`)

                break;
            case "descriptionInput": setDescription(e.target.value)
                console.log(`desc ${e.target.value}`)
                break;
            case "volumeInput": setVolume(e.target.value)
                console.log(`vol ${e.target.value}`)
                break;
            case "compositionInput": setComposition(e.target.value)
                console.log(`comp ${e.target.value}`)
                break;
            

            case "changeTitleInput": setChangeTitle(e.target.value)
                console.log(`title ${e.target.value}`)
                changeTextareaRef1.current.value = changeTitle
                break;
            case "chnageDescriptionInput": setChangeDescription(e.target.value)
                changeTextareaRef1.current.value = changeDescription
                console.log(`desc ${e.target.value}`)
                break;
            case "changeVolumeInput": setChangeVolume(e.target.value)
                changeTextareaRef1.current.value = changeVolume
                console.log(`vol ${e.target.value}`)
                break;
            case "changeCompositionInput": setChangeComposition(e.target.value)
                changeTextareaRef1.current.value = changeComposition
                console.log(`comp ${e.target.value}`)
                break;
        }

    }

    

    const resetValues = () => {
        formRef.current.reset()
        setPreviewImage(null)
        setSelectedFile(null)
        setComposition('')
        setDescription('')
        setTitle('')
        setVolume(0)
        
    }

    const handlePost = async () => {
        const response = await postProfileCardsRequest(
            title, description,
            composition, volume,
            selectedFile
        )
        const responseHandler = await responseStatusHandler(response)
        if (responseHandler == true) {
            setProfileInputsStatus(true)
            setCardsList(response.body)
            resetValues()

        } else {
            setProfileInputsStatus(false)
        }

    }

    const handleUpdate = async () =>{
        console.log("click")
        const response = await updateProfileCardsRequest(
            changeCardId, changeTitle, changeDescription,
            changeComposition, changeVolume,
            changeSelectedFile
        )
        const responseHandler = await responseStatusHandler(response)
        if (responseHandler == true) {
            setProfileInputsStatus(true)
            setCardsList(response.body)
            resetChangeValues()
            setChangePopupStatus(false)

        } else {
            setProfileInputsStatus(false)
        }

    }

    const checkPoles = async () => {
        if (selectedFile != null && isNotEmpty(volume) && isNotEmpty(description)
            && isNotEmpty(composition) && isNotEmpty(title)) {
            if (volume == Number(volume)) {

                handlePost()

            } else {
                setVolumeNotificationStatus(null)   // помигать статусом для типа данных для объема
                setTimeout(() => {
                    setVolumeNotificationStatus(true)
                }, 1)
            }
        } else {
            setFormNotificationStatus(null)   // помигать статусом для неполных данных
            setTimeout(() => {
                setFormNotificationStatus(true)
            }, 1)
        }

    }

    const deleteConfirmPoleStatusHandler = () => {
        if (cardsList.length == 0) {
            setDeleteErrorNotificationStatus(null)   // помигать статусом для типа данных для объема
            setTimeout(() => {
                setDeleteErrorNotificationStatus(true)
            }, 1)

        } else {
            setDeletePopupStatus(true)

        }
    }













    return (
        <div className={styles.main__wrapper}>

            <div className={styles.main}>

                <a className={styles.main__a} href='./'>На главную</a>




                {(() => {
                    if (profileInputsStatus == true && globalAuthStatus == 'authed') {
                        return (
                            <div>

                            <div className={styles.selection_wrapper}>
<div className={`${styles.selection_item} ${styles.selection_item_user_info}`}>
    <div className={styles.selection_item_inner_column}>
        <h2 className={styles.main__input__title}>{`Username ${usernameFromResponse}`}</h2>
                                    <h2 className={styles.main__input__title}>{`Id ${idFromResponse}`}</h2>
                                    <h2 className={styles.main__input__title}>{`Role ${userRoleFromResponse}`}</h2>
                                
    </div>
</div>
<div className={`${styles.selection_item}`}>
     <h2 className={`${styles.main__input__title} ${styles.selection_item_text}`}>История заказов</h2>
</div>
                            </div>


                                <form className={styles.input__form} ref={formRef}>
                                    <div className={styles.input__container__wrapper}>
                                        <h2 className={styles.main__input__title}>Заголовок</h2>
                                        <textarea ref={textareaRef1} className={styles.textarea} spellCheck="false" type="text" name="titleInput" onChange={((e) => {
                                            handleSetValue(e)
                                            changeTextareaHeight(textareaRef1)
                                        })}></textarea>
                                    </div>
                                    <div className={styles.input__container__wrapper}>
                                        <h2 className={styles.main__input__title}>Описание</h2>
                                        <textarea ref={textareaRef2} className={styles.textarea} spellCheck="false" type="text" name="descriptionInput" onChange={((e) => {
                                            handleSetValue(e)
                                            changeTextareaHeight(textareaRef2)
                                        })}></textarea>
                                    </div>
                                    <div className={styles.input__container__wrapper}>
                                        <h2 className={styles.main__input__title}>Состав товара</h2>
                                        <textarea ref={textareaRef3} className={styles.textarea} spellCheck="false" type="text" name="compositionInput" onChange={((e) => {
                                            handleSetValue(e)
                                            changeTextareaHeight(textareaRef3)
                                        })}></textarea>
                                    </div>
                                    <div className={styles.input__container__wrapper}>
                                        <h2 className={styles.main__input__title}>Объем</h2>
                                        <textarea ref={textareaRef4} className={styles.textarea} spellCheck="false" type="text" name="volumeInput" onChange={((e) => {
                                            handleSetValue(e)
                                            changeTextareaHeight(textareaRef4)
                                        })}></textarea>
                                    </div>
                                    <div className={styles.input__container__wrapper}>
                                        <div className={styles.title__and__button__wrapper}>
                                            <h2 className={styles.main__input__title}>Изображение</h2>
                                            <div className={styles.button} id='input__value' onClick={imageInputHandle}>Выберите изображение</div>
                                        </div>



                                        {(() => {
                                            if (previewImage == null) {
                                                return <div className={styles.preview__image__alt} >
                                                    <h4 className={styles.preview__image__alt__title}>Здесь будет превью вашего изображения</h4>
                                                </div>
                                            } else {
                                                return <img src={previewImage} alt="Preview" className={styles.preview__image} ></img>
                                            }
                                        })()}


                                        <input onChange={(e) => setImageLogic(e.target.files[0])} ref={imageInput} className={styles.file__input} type="file" accept="image/*" ></input>
                                    </div>

                                    <div className={styles.form__mainButtons__wrapper}>
                                        <div onClick={checkPoles} className={styles.button}  >Добавить карточку товара</div>
                                        <div onClick={deleteConfirmPoleStatusHandler} className={styles.button}  >Удалить все карточки товаров</div>
                                    </div>

                                </form>


                                <div className={styles.cardsList__wrapper}>
                                    {cardsList && cardsList.map((item) => (
                                        <ProfileCard key={item.id} item={item} 
                                        
                                        handleOpenChangePopup={handleOpenChangePopup}
                                        setChangePopupStatus={setChangePopupStatus}>
                                        </ProfileCard>
                                    ))}

                                </div>
                            </div>
                        )
                    }
                })()}
                {(() => {
                    if (profileInterfaceStatus == false ) {
                        return (
                            <h2 className={styles.main__input__title}>Авторизуйтесь чтобы продолжить</h2>
                        )
                    }
                })()}

                {(() => {
                    if (profileInterfaceStatus == null) {
                        return (
                            <Loader></Loader>
                        )
                    }
                })()}






                {(() => {
                    if (deletePopupStatus == true) {

                        return (
                            <Popup setLogicPopupStatus={setDeletePopupStatus}>

                                <div className={styles.delete__confirm__pole}>
                                    <h3 className={styles.delete__confirm__title}>
                                        Вы уверены что хотите продолжить?
                                    </h3>
                                    <div className={styles.button} onClick={() => {
                                        handleDelete(), setDeletePopupStatus(false)
                                    }
                                    }>Продолжить</div>
                                </div>



                            </Popup>

                        )
                    }
                })()}



                {(() => {
                    if (changePopupStatus == true && changeTitle!=null) {
                        return (
                            <Popup setLogicPopupStatus={setChangePopupStatus}>
                                <div className={styles.change__confirm__pole}>
                                    <div className={styles.change__card}>
                                        
                                        {changePreviewImage==null ? 
                                        <Base64ImageView className={styles.change__card__image} base64String={changeSelectedFile} />
                                        :
                                        <img className={styles.change__card__image}  src={changePreviewImage} />    
                                        }

                                        <div className={styles.button} id='input__value' onClick={changeImageInputHandle}>Изменить изображение</div>
                                        <input onChange={(e) => setChangeImageLogic(e.target.files[0])} ref={changeImageInput} className={styles.file__input} type="file" accept="image/*" ></input>
                                        
                                        <form ref={changeFormRef} className={styles.change__card__form}>
                                        <textarea ref={changeTextareaRef1} onChange={((e) => {
                                            handleSetValue(e)
                                            changeTextareaHeight(changeTextareaRef1)
                                        })} name="changeTitleInput" className={styles.textarea} value={changeTitle}></textarea>
                                        <textarea ref={changeTextareaRef2} onChange={((e) => {
                                            handleSetValue(e)
                                            changeTextareaHeight(changeTextareaRef2)
                                        })} name="changeDescriptionInput" className={styles.textarea} value={changeDescription}></textarea>
                                        <textarea ref={changeTextareaRef3} onChange={((e) => {
                                            handleSetValue(e)
                                            changeTextareaHeight(changeTextareaRef3)
                                        })} name="changeCompositionInput" className={styles.textarea} value={changeComposition}></textarea>
                                        <textarea ref={changeTextareaRef4} onChange={((e) => {
                                            handleSetValue(e)
                                            changeTextareaHeight(changeTextareaRef4)
                                        })} name="changeVolumeInput" className={styles.textarea} value={changeVolume}></textarea>

                                        </form>
        
                                        <h2 className={styles.card__h3} onClick={() => { handleUpdate()}}>
                                            Подтвердить изменения
                                        </h2>
                                    </div>
                                </div>
                            </Popup>
                        )
                    }
                })()}


                {(()=>{
                    if (onLogoutForAuthtorizationLoaderStatus == true){
                        return (
                            <Loader></Loader>
                        )
                    }
                })()}






            </div>


        </div >

    )








}

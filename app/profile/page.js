'use client'
import styles from './profile.module.css'
import { useRef } from "react"
import { useState, useEffect } from "react"
import { deleteReq, getReq, postReq } from "../data/cardsData"
import { useContext } from "react"
import { GlobalContext } from "../context/context"
import { loadTokenData } from "../data/dataHandler"
export default function Profile() {
    const imageInput = useRef(null)
    const formRef = useRef(null)
    let [cardsList, setCardsList] = useState([])
    let [title, setTitle] = useState('')
    let [volume, setVolume] = useState('')
    let [description, setDescription] = useState('')
    let [composition, setComposition] = useState('')
    let [selectedFile, setSelectedFile] = useState('')
useEffect(() => {
        const loadData = async () =>{
            const data = await loadTokenData()
            setCardsList(data.data)   
        }
        loadData()
    }, [])
const {login, logout,globalAuthStatus} = useContext(GlobalContext)
let [isChangeWindowOpen, setIsChangeWindowOpen] = useState(false)
const handleOpenChangeWindow = (id,
    title, description, composition,
    volume, productImage) =>{
    setIsChangeWindowOpen(true)
    console.log(key)
}

const handleDelete = async ()=>{
    const newData = await deleteReq()
    switch (newData.tokenStatus){
                case 'noToken':
                    logout()
                case 'invalidToken':
                    logout()
            }
    setCardsList(newData.data)
            setDescription("")
            setComposition("")
            setTitle("")
            setVolume("")
            cleanForm()
            setSelectedFile(null)
}
    const cleanForm = () =>{
        formRef.current?.reset()
    }

    const imageInputHandle = () => {
        imageInput.current?.click()
    }
    const Base64ImageView =  ({base64String}) =>{
        return (
    <img 
      src={`data:image/jpeg;base64,${base64String}`}
      className={styles.base64__image}
    />
  )
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
        }


    }
    
    
    const checkPoles =async () => {
        if (selectedFile!=null &&  isNotEmpty(volume) && isNotEmpty(description)
                && isNotEmpty(composition) && isNotEmpty(title)) {
            if (volume == Number(volume)) {
                const newData = await postReq(
                    title, description,
                    composition, volume, 
                    selectedFile
                )

                switch (newData.tokenStatus){
                case 'noToken':
                    logout()
                case 'invalidToken':
                    logout()
            }
                setCardsList(newData.data)
            }else{
                alert('Volume should be number')
            }
        } else {
            alert("Not empty inputs to proceed")
        }

    }
    
    

    

    return (
        <div className={styles.main__wrapper}>
            <div className={styles.main}>
            <a className={styles.main__a} href='./'>Back</a>
            {(()=>{
                if (globalAuthStatus=='authed')
                    return (<>
                    <form ref={formRef}>
                <div>
                    <h2 className={styles.main__input__title}>Title</h2>
                    <input type="text" name="titleInput" onChange={((e) => handleSetValue(e))}></input>
                </div>
                <div>
                    <h2 className={styles.main__input__title}>description</h2>
                    <input type="text" name="descriptionInput" onChange={((e) => handleSetValue(e))}></input>
                </div>
                <div>
                    <h2 className={styles.main__input__title}>product composition</h2>
                    <input type="text" name="compositionInput" onChange={((e) => handleSetValue(e))}></input>
                </div>
                <div>
                    <h2 className={styles.main__input__title}>volume</h2>
                    <input type="text" name="volumeInput" onChange={((e) => handleSetValue(e))}></input>
                </div>
                <div>
                    <h2 className={styles.main__input__title}>image</h2>
                    <div className="button" onClick={imageInputHandle}>Image?</div>
                    <input onChange={(e)=>setSelectedFile(e.target.files[0])} ref={imageInput} className="file__input" type="file" accept="image/*" ></input>
                </div>

                <div onClick={checkPoles} className="button" style={{ marginTop: '3vh' }} >add?</div>
                <div onClick={handleDelete} className="button" style={{ marginTop: '3vh' }} >delete?</div>

            </form>
            <div>
                {cardsList.map((item)=>{
                    return(
                        <div key={item.id} className={styles.card}>
                            <h1 className={styles.card__h1} >{item.title}</h1>
                            <h3 className={styles.card__h3}>{item.description}</h3>
                            <h3 className={styles.card__h3}>{item.composition}</h3>
                            <h3 className={styles.card__h3}>{item.volume}</h3>
                            <Base64ImageView base64String={item.productImage}></Base64ImageView>
                            <h2 className={styles.card__h3} onClick={((key)=>{handleOpenChangeWindow(item.id,
                                item.title, item.description, item.composition,
                                item.volume, item.productImage)})}>Change info</h2>

                        </div>
                    )
                })}
            </div>
                    </>)
                else return (<>
                    <h1>need to auth</h1>
                    <a href='./auth'>Go to auth</a>
                    </>
                )
            })()}
            </div>
        </div>
    )
}

export function  isNotEmpty(element){
        return (element && element.trim() !== "")
    }
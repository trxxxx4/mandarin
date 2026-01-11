import { route } from "./route"
import { setResult, errorStatusHandler } from "./dataHandler"
const getProfileRequest = async () => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const token = window.localStorage.getItem('token')
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    try {

        const response = await fetch(`${route}/api/profile`, {
            method: 'GET',
            headers
        })
        errorStatusHandler(response)
        console.log(response)
        const data = await response.json()
        const result  = setResult(data, response.status)
        return result
    }
    catch (error) { console.log(error) }

}

const postProfileCardsRequest = async (
    title, description, composition,
    volume, selectedFile
) =>{
    const headers = {
        
    }
    const token = window.localStorage.getItem('token')
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
let formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("composition", composition)
    formData.append("volume", volume)
    formData.append("productImage", selectedFile)

        const response = await fetch(`${route}/api/profile/admin`, {
            method: 'POST',
            body: formData,
            headers
        })
        errorStatusHandler(response)
        console.log(response)
        const data = await response.json()
        const result  = setResult(data, response.status)
        return result
    
    

}


const updateProfileCardsRequest = async (
    changeCardId, changeTitle, changeDescription,
    changeComposition, changeVolume,
    changeSelectedFile
) =>{
    const headers = {
        
    }
    const token = window.localStorage.getItem('token')
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
let formData = new FormData()
    formData.append("id", changeCardId)
    formData.append("title", changeTitle)
    formData.append("description", changeDescription)
    formData.append("composition", changeComposition)
    formData.append("volume", changeVolume)
    formData.append("productImage", changeSelectedFile)

        const response = await fetch(`${route}/api/profile/admin`, {
            method: 'PUT',
            body: formData,
            headers
        })
        errorStatusHandler(response)
        console.log(response)
        const data = await response.json()
        const result  = setResult(data, response.status)
        return result
    
    

}


const getProfileCardsRequest = async () => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const token = window.localStorage.getItem('token')
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    

        const response = await fetch(`${route}/api/profile/admin`, {
             method: 'GET',
            headers
        })
        errorStatusHandler(response)
        console.log(response)
        const data = await response.json()
        const result  = setResult(data, response.status)
        return result
    
}

const deleteProfileCardsRequest = async ()=>{
    const headers = {
        
    }
    const token = window.localStorage.getItem('token')
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }


        const response = await fetch(`${route}/api/profile/admin`, {
            method: 'DELETE',
            headers
        })

        errorStatusHandler(response)
        console.log(response)
        const data = await response.json()
        const result  = setResult(data, response.status)
        return result
    
}


export {
    deleteProfileCardsRequest,
    getProfileCardsRequest,
    getProfileRequest,
    postProfileCardsRequest,
    updateProfileCardsRequest
}
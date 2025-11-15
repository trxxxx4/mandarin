

const deleteReq = async () => {
    const token = window.localStorage.getItem('token')
    const responseHeaders = {

    }
    if (token) {
        console.log(token)
        responseHeaders.Authorization = `Bearer ${token}`
    }

    try {
        const response = await fetch('http://localhost:3000/profile', {
            method: "DELETE",
            headers: responseHeaders
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        let data = await response.json()
        console.log(data)
        let newData = await getReq()
        return newData

    }
    catch (error) { console.log(error) }

}

const postReq = async (
    title, description, composition,
    volume, selectedFile) => {
    const token = window.localStorage.getItem('token')
    const responseHeaders = {

    }
    if (token) {
        console.log(token)
        responseHeaders.Authorization = `Bearer ${token}`
    }


    let formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("composition", composition)
    formData.append("volume", volume)
    formData.append("productImage", selectedFile)
    /* let postBody = {
        title: title,
        volume: volume,
        description: description,
        composition: composition,
        imageSrc: ""
    } */
    console.log(formData)
    try {
        let response = await fetch('http://localhost:3000/profile',
            {
                method: "POST",
                 headers : responseHeaders,
                /*headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postBody) */
                body: formData,
                
            }
        )
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        let data = await response.json()
        let newData = await getReq()
        return newData
    } catch (error) { console.error(error) }
}

const getReq = async () => {
    const responseHeaders = {

    }
    try {

        const token = window.localStorage.getItem('token')

        if (token) {
            console.log(token)
            responseHeaders.Authorization = `Bearer ${token}`
        }

        let response = await fetch('http://localhost:3000/profile', {
            headers: responseHeaders,
            method: 'GET'
        })


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json()
        console.log('get')
        
        
        switch (data.tokenStatus){
                case 'noToken':
                    data.data = []
                    console.log(data)
                    return data
                case 'invalidToken':
                    data.data = []
                    console.log(data)
                    return data
                case 'tokenVerified':
                    console.log(data)
                    return data
            }


    } catch (error) {
        console.error(error)
        
        return []
    }

}
export {
    getReq, postReq, deleteReq
}
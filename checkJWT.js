const crypto = require('crypto')
const secretKey = 'pivo-mirea-metro'

const dataToBase64 = (data) =>{
    return Buffer.from(JSON.stringify(data)).toString('base64')
}
const dataFromBase64 = (dataBase64) =>{
    return JSON.parse((Buffer.from(dataBase64, 'base64').toString('utf8')))
}

const base64UrlEncoding = (dataInBase64) =>{
    const base64url = dataInBase64.replace(/\+/g, '-')
                    .replace(/\//g,'_')
                    .replace(/=/g,'')
    return base64url
}

const base64UrlDecoding = (base64url) =>{
    let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
    while (base64.length % 4){
        base64 += '='
    }
    return base64
}

const checkJWT = (token)=>{
    const [headerBase64url, payloadBase64url, signatureBase64url] = 
    token.split('.')
    const expectedData = `${base64UrlDecoding(headerBase64url)}.${base64UrlDecoding(payloadBase64url)}`
    let expectedSignature = crypto
        .createHmac('sha256', secretKey)
        .update(expectedData)
        .digest('base64')
    expectedSignature = base64UrlEncoding(expectedSignature)
        if (signatureBase64url!=expectedSignature){
        const status = 'invalidSignature'
        
        return status
    }  
    const data = dataFromBase64(base64UrlDecoding(payloadBase64url))
    return data
}   

const setJWT = (userData)=>{
    const header = {
        alg : "HS256",
        typ :'JWT'
    }
    const currentTime = new Date().getTime()
    userData = {
        ...userData,
        iat: currentTime,
        exp: currentTime +(600*1000)
        
    }
    const headerEncoded = base64UrlEncoding(dataToBase64(header))
    const payloadEncoded = base64UrlEncoding(dataToBase64(userData))
    const data = `${headerEncoded}.${payloadEncoded}`
    let signature = crypto
                            .createHmac('sha256', secretKey)
                            .update(data)
                            .digest('base64')
    signature = base64UrlEncoding(signature)
                            
    return `${data}.${signature}`
    
}
module.exports = {
    checkJWT,
    setJWT
};
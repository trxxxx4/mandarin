const {checkJWT} = require('./checkJWT')
const setTokenStatus = (token)=>{
    const result = checkJWT(token)
    if (result=='invalidToken'){
        const data = {
         result :  'invalidToken'   
        }
        return data
    }else {
        const data = {
            data : result,
            result :  'tokenVerified'
        }
        return data
    }
}




module.exports ={
    setTokenStatus
}
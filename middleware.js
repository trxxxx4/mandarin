const {setTokenStatus} = require('./stateResponses')

const checkValidJWT = (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1]
        if (token==undefined){
            req.tokenStatus = 'noToken'
        }else {
            const result = setTokenStatus(token)
            req.tokenStatus = result.result
            req.data = result.data
            
        } 
        next()
    } catch (error) {
        throw new Error('error')
    }
}
const preResponse = (req, res, next) =>{
    try{
        switch (req.tokenStatus){
            case 'invalidToken':
                res.json({tokenStatus:'invalidToken'})
                break
            case 'noToken':
                res.json({tokenStatus:'noToken'})
                break
            case 'tokenVerified':
                req.tokenStatus='tokenVerified'
                
                next()
        }
    }  catch (error) {throw new Error(error)}
}

module.exports = {
    checkValidJWT,
    preResponse
}
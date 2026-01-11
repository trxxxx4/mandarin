const express = require("express")
const router = express.Router()
router.use(express.json())
const { setJWT, checkJWT } = require('./checkJWT')

const JWTinitial = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (token == undefined) {
        req.tokenStatus = 'noToken'
        console.log(11)
        return res.status(401).json({ error: 'noToken' })
    } else {
        const JWTcheckedToken = checkJWT(token)
        const currentTime = new Date().getTime()
        if (JWTcheckedToken == '') {
            req.tokenStatus = 'invalidToken'
            console.log(22)
            return res.status(401).json({ error: 'invalidToken' })
        } else if (currentTime) {
            req.tokenStatus = 'tokenVerified'
            req.token = JWTcheckedToken
            req.userRole = JWTcheckedToken.role
            next()
        }
        else {
            req.tokenStatus = 'invalidToken'
            console.log(22)
            return res.status(401).json({ error: 'tokenExpNotValid' })
        }




    }


}
module.exports = {
    JWTinitial
}

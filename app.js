const {setJWT, checkJWT} = require('./checkJWT.js')
const {checkValidJWT, preResponse} = require('./middleware.js')
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const cardsRouter = require('./cardsLogic.js')
const userRouter = require('./authentication/userLogics.js')
const profileRouter = require('./profile/profileLogic.js')
const { JWTinitial } = require("./middleware")
const corsControls = {
    origin: "http://localhost:4000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}


app.use(cors(corsControls))


app.use('/api/profile', JWTinitial, profileRouter)
app.use('/api/authentication', userRouter)






app.listen((port),(()=>{
    console.log(port)
} ))
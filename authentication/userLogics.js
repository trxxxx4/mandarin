const express  = require("express")
const router = express.Router()
router.use(express.json())
const {CardIdCollection, UserCollection, UserIdCollection} = require('../mongoose') 
const {setJWT}= require('../checkJWT')

router.post('/auth', async (req, res)=>{
    const formReq = req.body
    
    let data = await UserCollection.findOne({username:`${formReq.username}`, password:`${formReq.password}`}).lean()
    const currentDate = new Date().getTime()
    console.log(data)
    if (data){
        await UserCollection.updateOne({username:`${formReq.username}`}, {$set: { lastestLoginRequest:currentDate}})
        let data = await UserCollection.findOne({username:`${formReq.username}`, password:`${formReq.password}`}).lean()
    
        delete data.password

        const token = setJWT(data)
        
        res.json({username:data.username,
        status:'authed',
        token :token,
        
        })
    }else{
        res.json({
        status:'notAuthed'
        
        })
    }
    
})



router.post('/registration', async (req, res)=>{
    const formReq = req.body
    console.log(formReq)
    const data = await UserCollection.findOne({username:`${formReq.username}`})
    console.log(data)
    if (data!=null){
        
        res.json({username:formReq.username,
        message:'already exists',
        status:'registrationNotSuccess'
        })
    }else{
        const commonCnt = (await CardIdCollection.find({})).length 
                    + (await UserIdCollection.find({})).length
        const  cnt = (await UserIdCollection.find({})).length
        await UserIdCollection.create({
            id:cnt+1,
            commonId:commonCnt+1
        })
        const currentDate = new Date().getTime()
        await UserCollection.create({id:cnt+1, username:`${formReq.username}`, password:`${formReq.password}`,
            lastestLoginRequest:currentDate, role:'user', })
        
        res.json({
        message:'registration successed',
        status:'registrationSuccess',
        username:`${formReq.username}` 
        
        })
    }
    
})
module.exports = router
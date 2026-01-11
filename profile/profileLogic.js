const { JWTinitial } = require("../middleware")
const express  = require("express")
const router = express.Router()
router.use(express.json())
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const {UserCollection,
    UserIdCollection,
    CardIdCollection,
CardCollection  } = require('../mongoose')

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        const parentDir = path.join(__dirname, '..')
        cb(null, path.join(parentDir, 'uploads'))
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+'-' + Math.round(Math.random() * 1e6) + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage,
    fileFilter: (req, file, cb) =>{
        if (file.mimetype.startsWith('image/')){
            cb(null, true)
        }else {
            cb(new Error("Need image"), false)
        }
    }
})

router.post('/admin',upload.single('productImage'), async (req, res) => {
    if (req.userRole=='admin'){
        const data = req.body
    const commonCardsCount = (await CardIdCollection.find({})).length 
                    + (await UserIdCollection.find({})).length
    const  cardsCount = (await CardIdCollection.find({})).length
    await CardIdCollection.create({id:cardsCount+1, commonId:commonCardsCount+1})
    await CardCollection.create({id:cardsCount+1, title:`${data.title}`, volume:data.volume, composition:`${data.composition}`,
        imageSrc: `${req.file.filename}`
    })
    let result = await CardCollection.find({}).lean()
    result = setImageLogic(result)
    res.json(result)
    }else{
        res.status(403).json([])
    }
    
})

router.put('/admin',upload.single('productImage'), async (req, res) => {
    if (req.userRole=='admin'){
        const data = req.body
        console.log(data.title)
    await CardCollection.updateOne({id: data.id}, {$set : {title:`${data.title}`, volume:data.volume, 
        composition:`${data.composition}`, imageSrc:`${req.file.filename}`}})
    let result = await CardCollection.find({}).lean()
    result = setImageLogic(result)
    console.log(result)
    res.json(result)
    }else{
        res.status(403).json([])
    }
    
})

router.get('/', async (req, res)=>{
    const requestBody = req.token
    const data = await UserCollection.findOne({username:`${requestBody.username}`}).lean()
    console.log(data)
    if (data!=undefined){
        res.json(data)
    }else res.status(404)
} )


router.get('/admin', async (req, res)=>{
    
    if (req.userRole=='admin'){
        let data = await CardCollection.find({}).lean()
        data = setImageLogic(data)
        res.json(data)
    }else{
        res.status(403).json([])
    }
    
})
router.delete('/admin', JWTinitial, async (req, res)=>{
    if (req.userRole=='admin'){
        let data = await CardCollection.find({}).lean()
        await deleteImageLogic(data)
        await CardCollection.deleteMany({})
        data = await CardCollection.find({}).lean()
        console.log(data)
        res.json(data)
    }else{
        res.status(403).json([])
    }
})



const setImageLogic = (data)=>{
    data.forEach((item)=>{
                
                const parentDir = path.join(__dirname, '..')
                let imageBuffer = fs.readFileSync(path.join(parentDir, `uploads`,`${item.imageSrc}`))
                const base64String = imageBuffer.toString('base64')
                delete item.imageSrc
                item.productImage = base64String
            })
    return data
}

const deleteImageLogic = async (data)=>{
    try{
        for (const item of data){
            const parentDir = path.join(__dirname, '..')
                const imagePath = path.join(parentDir, `uploads`,`${item.imageSrc}`)
                await fs.promises.unlink(imagePath)
        }
    
    } catch (error) {console.log(error)}
    
}

module.exports = router
const express = require('express')
const router = express.Router()
router.use(express.json())
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const {CardIdCollection, DrinkCollection, UserIdCollection} = require('./mongoose') 

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, path.join(__dirname, 'uploads'))
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

router.post('/',upload.single('productImage'), async (req, res) => {
    
    let data = req.body
    console.log(`req`)
    console.log(data)
    const commonCnt = (await CardIdCollection.find({})).length 
                    + (await UserIdCollection.find({})).length
    const  cnt = (await CardIdCollection.find({})).length
    await CardIdCollection.create({id:cnt+1, commonId:commonCnt+1})

    await DrinkCollection.create({id:cnt+1, title:`${data.title}`, volume:data.volume, composition:`${data.composition}`,
        imageSrc: `${req.file.filename}`
    })
    let newData = await DrinkCollection.find({}).lean()
    console.log(`res`)
    console.log(newData)
    newData.tokenStatus = req.tokenStatus,
    res.json(newData)
})

router.delete('/', async (req, res)=>{
    await DrinkCollection.deleteMany({})
    /*  надо бы сделать чтобы фотки удаляллись
    по адресу в документах бд а потом уже deleteMany
    */
    console.log((await DrinkCollection.find({})).length)
    let data = await DrinkCollection.find({}).lean()
    res.json({Result:"all deleted",
        tokenStatus: req.tokenStatus
    })


})
router.get('/', async (req, res)=>{
    let data = await DrinkCollection.find({}).lean()
    data.forEach((item)=>{
        console.log(item.imageSrc)
        console.log((path.join(__dirname, `uploads`,`${item.imageSrc}`)))
        let imageBuffer = fs.readFileSync(path.join(__dirname, `uploads`,`${item.imageSrc}`))
        const base64String = imageBuffer.toString('base64')
        delete item.imageSrc
        item.productImage = base64String
    })
    
    let newData = {
        data : data,
        tokenStatus: req.tokenStatus
    }
   
    console.log(newData)
    res.json(newData)
})

module.exports = router

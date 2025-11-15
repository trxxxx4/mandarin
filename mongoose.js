


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/products')

const UserSchema = new mongoose.Schema({
    id:Number,
    username:String,
    password:String,
    role:String,
    lastestLoginRequest:Number
})
const UserCollection = mongoose.model('users', UserSchema)
const DrinkSchema = new mongoose.Schema({
    id:Number,
    title: String,
    volume:Number,
    composition:String,
    imageSrc : String
})
const DrinkCollection = mongoose.model('drinks',DrinkSchema)
const CardIdSchema = new mongoose.Schema({
    id:Number,
    commonId:Number  
    
})
const CardIdCollection = mongoose.model('cardIds', CardIdSchema)

const UserIdSchema = new mongoose.Schema({
    id:Number,
    commonId:Number  
})
const UserIdCollection = mongoose.model('userIds', UserIdSchema)
module.exports = {
    DrinkCollection,
    UserCollection,
    UserIdCollection,
    CardIdCollection
}
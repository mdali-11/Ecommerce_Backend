
const mongoose =require("mongoose")

const userSchema =mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    countryCode:String,
    phone:Number
})

const userModel =mongoose.model('user',userSchema)

module.exports ={userModel}
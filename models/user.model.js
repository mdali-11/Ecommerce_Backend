
const mongoose =require("mongoose")

const userSchema =mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    countryCode: { type: String, required: true },
    country:{type:String},
})

const userModel =mongoose.model('user',userSchema)

module.exports ={userModel}
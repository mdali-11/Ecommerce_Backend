
const mongoose =require("mongoose")

const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    countryCode: { type: String, required: true },
    country:{type:String},
})

const AdminModel =mongoose.model('admin',adminSchema)

module.exports ={AdminModel}
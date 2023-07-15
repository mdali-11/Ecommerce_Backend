const express= require("express")
var cors = require('cors')
require('dotenv').config()
const {connection} =require('./config/db')
const {userRouter}=require("./routes/user.route")
const {cartRouter} =require("./routes/cart.route")
const {productRouter} = require("./routes/product.route")
const {orderRouter} =require('./routes/order.route')
const {adminRouter} =require("./routes/admin.route")
const {validator,productValidator} =require("./middlewares/validator.middleware")


const app =express()
app.use(cors())
app.use(express.json())


app.use("/admin",adminRouter)
app.use("/user",userRouter)
app.use(productValidator)
app.use("/product",productRouter)
app.use(validator)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)


app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("Connected to Database")
    }catch(err){
        console.log(err,"Something went Wrong")
    }
    console.log(`Running on port no ${process.env.PORT}`)
})
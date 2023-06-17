const express= require('express')
const orderRouter =express.Router()
const {orderModel} =require("../models/order.model")
const {cartModel} =require("../models/cart.model")



orderRouter.post("/",async(req,res)=>{
    const {userId} =req.body;
    console.log(userId)
 
    try{
      const data =await cartModel.find({userId:userId})
      console.log()
         if(data){
            const Data =await orderModel.insertMany(data)
            //  console.log(Data)
            if(Data){
              const DeletedData =await cartModel.deleteMany({userId:userId})
              console.log(DeletedData)
            }
             res.send({"msg":"Ordered Successfully"})
         }else{
            res.status(400).send({"msg":"data not found"})
         }
      }
     catch(err){
        console.log(err)
     res.send({"msg":"something went wrong"})
     
    }
})


orderRouter.get("/order",async(req,res)=>{
   try{
      const Data =await orderModel.find()
      res.send(Data)
     }
    catch(err){
       console.log(err)
    res.send({"msg":"something went wrong"})
    
   }
})

module.exports ={orderRouter}
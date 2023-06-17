const express= require('express')
const productRouter =express.Router()
const {productModel} =require("../models/product.model")
const {orderModel} =require("../models/order.model")


productRouter.get("/:path",async(req,res)=>{
   const category =req.params.path;
   let arr =[{category:category}];
   const query =req.query;
   const page =query.page||1;
   const limit=10;
   const skip=(page-1)*limit;
   let sortBy={}
   if(query.price){
    let [min,max] =query.price.split("-").map(Number)
    arr.push({price:{$gte:min}})
    arr.push({price:{$lte:max}})
   }
   if(query.sortBy){
    if(query.sortBy=="asc"){
        sortBy={
           price:"asc"
        }
    }else{
        if(query.sortBy=="desc"){
            sortBy={
               price:"desc"
            }
    }
   }
}
    try{
     const data = await productModel.find({$and:arr}).sort(sortBy).skip(skip).limit(limit);
     console.log(data)
     res.json(data)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
productRouter.post("/search",async(req,res)=>{
    const payload =req.body;
    // console.log(payload)
    try{
       const data =await  productModel.find({title:{$regex:payload.payload,$options:"i"}})
       res.send({data:data})
    }catch(err){
    //  console.log(err)
     res.send({"msg":"soething went wrong"})
    }
})


productRouter.get("/single/:id",async(req,res)=>{
    console.log(req.params.id)
   
      try{
       const data = await productModel.findById({_id:req.params.id});
    //    console.log(data)
       res.json({data:data})
      }catch(err){
          console.log(err)
          res.send(err)
      }
  })




  productRouter.get("/order/order",async(req,res)=>{
    try{
       const Data =await orderModel.find()
       res.send(Data)
      }
     catch(err){
        console.log(err)
     res.send({"msg":"something went wrong"})
     
    }
 })








// productRouter.patch("/update/:id",async(req,res)=>{
//    const payload =req.body;
   
//      const id =req.params.id;
//   const userId =req.body.userId;
//   const note =await productModel.findOne({"_id":id})
//   try{
//     if(note.userId !== userId){
//       return res.send("You are not authorised to do it")
//   }else{
//   const data =  await productModel.findByIdAndUpdate({"_id":id},payload)
//     return res.send("updated")
//     console.log(data)
//   }
//   }catch(err){
//     res.send("err")
//     console.log({"err":"something went wrong"})
//   }
// })


// productRouter.delete("/update/:id",async(req,res)=>{
//       const id =req.params.id;
//    const userId =req.body.userId;
//    const note =await productModel.findOne({"_id":id})
//    try{
//      if(note.userId !== userId){
//        return res.send("You are not authorised to do it")
//    }else{
//    const data =  await productModel.findByIdAndDelete({"_id":id})
//      return res.send("deleted")
//      console.log(data)
//    }
//    }catch(err){
//      res.send("err")
//      console.log({"err":"something went wrong"})
//    }
//  })
 
 module.exports ={productRouter}

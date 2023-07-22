const express =require("express")
const jwt=require("jsonwebtoken")
const bcrypt =require("bcrypt")
const {userModel} =require("../models/user.model")
require('dotenv').config()

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password,name,gender, phone, countryCode, country} =req.body;
    // console.log(req.body)
    try{
        const user = await userModel.findOne({email})
        if(user){
            res.send("Email already exist")
        }else{
            bcrypt.hash(password,5,async(err,secure_pass)=>{
                if(err){
                    console.log(err)
                }else{
                    const user =new userModel({email,password:secure_pass,name,gender,phone, countryCode,country})
                    console.log(user)
                    await user.save()
                    res.send("User Registered Successfully")
                   
                }
                })
        }
      
    }catch(err){
    res.send("err happened in post request")
    }
})

userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    // console.log(email,password)
    try{
    const user = await userModel.findOne({email})
    console.log(user)
    if(user){
    const hashed_password=user.password
    // console.log(hashed_password)
    bcrypt.compare(password,hashed_password,(err,result)=>{
    if(result){
        const token=jwt.sign({userId:user._id},process.env.secret,{expiresIn:"1hr"})
        const User ={
         _id:user._id,
           name:user.name,
          email:user.email,
          gender:user.gender,
          phone:user.phone
        }
        res.send({"msg":"Login Successful","token":token,user:User})
    }else{
        res.send("wrong crendentials")
    }
        });
    } else {
    res.send({"msg":"user doesnot exist"})
    }
    } catch(err){
    console.log(err)
    }
    })

  
    

module.exports ={userRouter}
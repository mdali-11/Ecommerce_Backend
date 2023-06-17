const express = require("express");
const { AdminModel } = require("../models/admin.model");
const {productModel} =require("../models/product.model")
const jwt=require("jsonwebtoken")
const bcrypt =require("bcrypt")
const {userModel} =require("../models/user.model")
require('dotenv').config()

const adminRouter =express.Router()

 adminRouter.post("/register",async(req,res)=>{
    const {email,password,name,role} =req.body;
    // console.log(req.body)
    try{
      const user = await  AdminModel.findOne({email})
      if(user){
        res.send("Admin Already Exists")
      }else{
        bcrypt.hash(password,5,async(err,secure_pass)=>{
          if(err){
              console.log(err)
          }else{
              const user =new  AdminModel({email,password:secure_pass,name,role})
              console.log(user)
              await user.save()
              res.send("Admin Registered Succcessfully")
             
          }
          })
      }    
    }catch(err){
    res.send("err happened in post request")
    }
})



 adminRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    // console.log(email,password)
    try{
    const user = await  AdminModel.findOne({email})
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
          role:user.role
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

//   ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    
// getting all admin users


adminRouter.get("/alladmins", async (req, res) => {
    try {
      const Admins = await AdminModel.find();
      res.status(200).send(Admins);
    } catch (e) {
      res
        .status(404)
        .send({ message: "Something went wrong", error: true, errorMessage: e });
    }
  });


// ...single data of admin
adminRouter.get("/singleadmin/:id", async (req, res) => {
    const Id = req.params.id;
    try {
      const singleAdmin = await AdminModel.find({ _id: Id });
      res.status(200).send(singleAdmin);
    } catch (e) {
      res
        .status(404)
        .send({ message: "Something went wrong", error: true, errorMessage: e });
    }
  });
//   ....delete admin
  adminRouter.delete(`/deleteadmin/:id`, async (req, res) => {
    const ID = req.params.id;
    try {
      await AdminModel.findByIdAndDelete({ _id: ID });
      res.send(`Deleted the Admin whose id is ${ID}`);
    } catch (error) {
      console.log(error);
      res.send({ err: "Something went wrong" });
    }
  });
  
//   ...getting admin to all customer data
  adminRouter.get("/allcustomer", async (req, res) => {
    try {
      const allUsers = await userModel.find();
      res.status(200).send(allUsers);
    } catch (e) {
      res
        .status(404)
        .send({ message: "Something went wrong", error: true, errorMessage: e });
    }
  });
  
//   single data of customer
  adminRouter.get("/singlecustomer/:id", async (req, res) => {
    const Id = req.params.id;
    try {
      const allUsers = await userModel.find({ _id: Id });
      res.status(200).send(allUsers);
    } catch (e) {
      res
        .status(404)
        .send({ message: "Something went wrong", error: true, errorMessage: e });
    }
  });
  
//   deleteing customer from admin side
  adminRouter.delete(`/deletecustomer/:id`, async (req, res) => {
    const ID = req.params.id;
    try {
      await userModel.findByIdAndDelete({ _id: ID });
      res.send(`Deleted the Product whose id is ${ID}`);
    } catch (error) {
      console.log(error);
      res.send({ err: "Something went wrong" });
    }
  });


// products..............................routes..for..admin...

adminRouter.get("/admin/fetch",async(req,res)=>{
    const {sortBy,page,limit}=req.body;
    const _limit =limit||15
    const _Page =page||1
    const skip =(_Page-1)*limit;
    try{
    const data =await productModel.find().sort({price:sortBy}).skip(skip).limit(_limit)
    res.send({data:data})
    
    }catch(err){

    }
    
  })


//   ...admin ...get  request single products 
adminRouter.get("/single/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await productModel.find({ _id: id });
      res.status(200).send(product);
    } catch (error) {
      res
        .status(404)
        .send({ message: "Error while fetching products", error: error });
    }
  });
//   .....post request to add products in Alldata
  adminRouter.post("/addproduct", async (req, res) => {
    const payload = req.body;
    try {
      const newProduct = new productModel(payload);
      await newProduct.save();
      res.send(newProduct);
    } catch (error) {
      console.log(error);
      res.send({ err: "Something went wrong" });
    }
  });

//   ...patch request for admin
  
  adminRouter.patch(`/updateproduct/:id`, async (req, res) => {
    const ID = req.params.id;
    const payload = req.body;
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(
        { _id: ID },
        payload
      );
      res.send(updatedProduct);
    } catch (error) {
      console.log(error);
      res.send({ err: "Something went wrong" });
    }
  });

  //   ...delete request for admin
  
  adminRouter.delete(`/deleteproduct/:id`, async (req, res) => {
    const ID = req.params.id;
    try {
      await productModel.findByIdAndDelete({ _id: ID });
      res.send(`Deleted the Product whose id is ${ID}`);
    } catch (error) {
      console.log(error);
      res.send({ err: "Something went wrong" });
    }
  });
  

  module.exports ={adminRouter}
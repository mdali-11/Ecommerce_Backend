// const express= require('express')
// const {cartModel} =require("../models/cart.model")

// const cartRouter =express.Router()

// cartRouter.post("/",async(req,res)=>{
//     const data =req.body;
//    //  console.log(data)
//     try{
//       const isData =await cartModel.findOne({$and:[{userId:data.userId},{refId:data.refId}]})
//       // console.log(isData)
//       if(isData){
//          isData.quantity =isData.quantity+data.quantity;
//           const Data =await cartModel.findByIdAndUpdate({_id:isData._id},isData)
//           res.send({"msg":"Data Added to Cart"})
//       }else{
//          const Data = new  cartModel(data)
//          await Data.save()
//          res.send({"msg":"Data  Added to Cart"})
//       }
//       }
//      catch(err){
//         console.log(err)
//      res.send({"msg":"soething went wrong"})
     
//     }
// })
// cartRouter.get("/",async(req,res)=>{
//    const data =req.body;
//     try{
//       const isData =await cartModel.find({userId:data.userId})
//       console.log(isData)
//        res.send({data:isData})
       
//     }catch(err){
//         console.log(err)
//      res.send({"msg":"something went wrong"})
     
//     }
// })


// cartRouter.delete("/:id",async(req,res)=>{
//    const _id =req.params.id;
//        try{
//        const data =  await cartModel.findByIdAndDelete({"_id":_id})
//          return res.send({"msg":"Data gets deleted"})
//        }catch(err){
//          res.send("err")
//          console.log({"err":"something went wrong"})
//        }
//      })

// module.exports ={cartRouter}


const express = require('express');
const cartModel = require("../models/cart.model")

const cartRouter = express.Router();

// POST route to add an item to the cart or update its quantity
cartRouter.post('/addtocart', async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id; // Assuming you have authentication middleware to set the user ID

  try {
    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      // Create a new cart if it doesn't exist for the user
      cart = new cartModel({
        user: userId,
        items: [{ product: productId }],
      });
    } else {
      // Check if the product already exists in the cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        // Update the quantity if the product already exists
        existingItem.quantity = quantity;
      } else {
        // Add a new item if the product doesn't exist
        cart.items.push({ product: productId, quantity });
      }
    }

    const updatedCart = await cart.save();
    res.status(201).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// GET route to retrieve the user's cart
cartRouter.get('/', async (req, res) => {
  const userId = req.user._id; // Assuming you have authentication middleware to set the user ID

  try {
    const cart = await cartModel.findOne({ user: userId })
      .populate('items.product', 'title price'); // Populate the product details

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// PUT route to update the quantity of a specific item in the cart
cartRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const userId = req.user._id; // Assuming you have authentication middleware to set the user ID

  try {
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemToUpdate = cart.items.find((item) => item._id.toString() === id);

    if (!itemToUpdate) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    itemToUpdate.quantity = quantity;

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// DELETE route to remove an item from the cart
cartRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Assuming you have authentication middleware to set the user ID

  try {
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== id);

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = {cartRouter};

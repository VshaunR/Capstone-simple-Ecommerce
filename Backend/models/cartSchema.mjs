import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  
UserId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User'
},
Product:[],


});


export default mongoose.model("Cart",cartSchema)
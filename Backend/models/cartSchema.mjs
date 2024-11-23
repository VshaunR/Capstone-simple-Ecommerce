import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  
UserId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Users'
},
Product:[],



});

cartSchema.index({date:1})
export default mongoose.model("Cart",cartSchema)
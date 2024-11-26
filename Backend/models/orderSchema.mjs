import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
date:{
  type:Date,
  default:Date.now()
},
userId:{
  type:String
},
cart:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Cart'
}

});


export default mongoose.model("Order",orderSchema);
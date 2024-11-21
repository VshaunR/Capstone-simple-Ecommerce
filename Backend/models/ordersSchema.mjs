import mongoose from "mongoose";


const ordersSchema = new mongoose.Schema({


Products:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Cart',
  required:true
}],
date:{
  type:Date,
  default:Date.now().toLocaleString(),
  
}

});




export default mongoose.model('Orders',ordersSchema)
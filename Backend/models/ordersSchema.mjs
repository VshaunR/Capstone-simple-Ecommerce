import mongoose from "mongoose";


const ordersSchema = new mongoose.Schema({


products:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Product',
  required:true
}],
date:{
  type:Date,
  default:Date.now().toLocaleString(),
  
}

});




export default mongoose.model('Orders',ordersSchema)
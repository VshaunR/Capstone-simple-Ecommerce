import mongoose, { mongo } from "mongoose";


const productSchema = new mongoose.Schema({
category:{
  type:String,
  required:true,
},
name:{
  type:String,
  required:true,
},
price:{
  type:String,
  required:true,
},
url:{
  type:String,
  required:true
}

});

productSchema.index({category:1});
productSchema.index({name:1});
productSchema.index({stocked:1});

productSchema.statics.findByCategory= function (category){
  return this.where({category:new RegExp(category,"i")})
}


export default mongoose.model("Product",productSchema);
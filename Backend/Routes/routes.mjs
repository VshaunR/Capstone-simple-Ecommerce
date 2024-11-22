import express from 'express';
import Product from '../models/productSchema.mjs';
const router = express.Router();

//get all
router.get('/',async(req,res)=>{
  try {

    let result = await Product.find({});
    res.json(result) 


  } catch (e) {
    console.error(e)
    res.status(500).json({msg:`Server error`})
  }


});
router.post('/',async(req,res)=>{
  try {
      let newProduct = new Product(req.body);
      await newProduct.save();
      res.json(newProduct)


  } catch (e) {
    console.error(e)
    res.status(500).json({msg:`Server error`})
  }
});
router.get('/category',async(req,res)=>{
  try {
    // useing method
    let result = await Product.findByCategory({category:req.body.category})
    //using index below
    // let result = await Product.find({category:req.params.category})
    res.json(result)
  } catch (e) {
    console.error(e)
    res.status(500).json({msg:`Server error`})
  }
});


router.get('/:id',async(req,res)=>{
  try {
    
    let result = await Product.findById(req.params.id)
    res.json(result)
  } catch (e) {
    console.error(e)
    res.status(500).json({msg:`Server error`})
  }
});




router.put('/:id',async(req,res)=>{
  try {
    
    let updated = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(updated)
  } catch (e) {
    console.error(e)
    res.status(500).json({msg:`Server error`})
  }
});
router.patch('/:id',async(req,res)=>{
  try {
    let updatedStock = await Product.findByIdAndUpdate(req.params.id,req.body.stocked);
    res.json(updatedStock)
  } catch (e) {
    console.error(e)
    res.status(500).json({msg:`Server error`})
  }
});

router.delete('/:id',async(req,res)=>{
  try {
    let deleted = await Product.findByIdAndDelete(req.params.id);
    res.json(deleted)
  } catch (e) {
    console.error(e)
    res.status(500).json({msg:`Server error`})
  }
});














export default router;
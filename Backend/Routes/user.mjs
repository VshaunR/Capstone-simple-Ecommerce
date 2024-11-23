import express from 'express';
import dotenv from 'dotenv';
import {check,validationResult} from 'express-validator';
import User from '../models/userSchema.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authorize from '../middleware/auth.mjs';

import Cart from '../models/cartSchema.mjs';
dotenv.config();
const router = express.Router()
//register user



router.post('/',[
  check('name','Name field is Emppty').not().isEmpty(),
  check('email','Include a valid Email!').isEmail(),
  check('password','Password field with > 6 characters Required').isLength({min:6})

],async(req,res)=>{
  //to run the express-validation checks
  const errors = validationResult(req);
  //consolidating our error into an array to display to user or us
  if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})

    const {email,name,password} = req.body;
      
    try {
      
    let user = await User.findOne({email});
    // checking if the user already exists
      if(user){
      return  res.status(401).json({errors:[{msg:`User already exists`}]})
      }
      // so if user does not already exists we create a new user
      //and pass in the values from the req.body
      
      user = new User({
        name,email,password
      });

      //generating salt rounds to hash our password

      const saltRounds = await bcrypt.genSalt(10);

      // encrypt the user password
      user.password = await bcrypt.hash(password,saltRounds);
      //save the user information in the database
      await user.save();

      //create payload for later use
      //give it the userId so we can access the users information later
      const payload= {
        user:{
          id:user.id
        }
      }

      //generate a jwt token to keep user signed in
      // handle error if token invalid and handle success if token is valid
      //generates a unique token if successful
      jwt.sign(
        payload,
        process.env.jwtSecret,
        {
          expiresIn:3600
        },
        (err,token)=>{
          if(err) throw err;


          res.json({token})
        }
      )

    } catch (e) {
      console.error(e);
      res.status(500).json({errors:[{msg:`Server Error`}]})
    }

})



router.get('/:id',authorize,async(req,res)=>{

  try {
    let result = await User.findById(req.user.id).select('-password')
    res.json(result)

  } catch (e) {
    console.error(e);
      res.status(500).json({errors:[{msg:`Server Error`}]})
  }

});

// HOW I WOULD RETRIEVE MY ORDER HISTORY
router.get('/history/:id',authorize,async(req,res)=>{
  try {
    let result = await Cart.find({UserId:req.user.id}).sort({date:1})
    res.json(result);
  } catch (error) {
    console.error(e);
    res.status(500).json({errors:[{msg:`Server Error`}]})
  }
})

//GET THE FIRST INDEX OF THE CARTCHEMA WHICH WILL BE THE LATEST ORDER
//SO I CAN DISPLAY IT IN CHECKOUT
router.get('/cart/:id',authorize,async(req,res)=>{
  try {
    let result = await Cart.find({UserId:req.user.id})
    res.json(result[result.length-1]);
  } catch (e) {
    console.error(e);
    res.status(500).json({errors:[{msg:`Server Error`}]})
  }
})
//adding to cart
router.post('/cart',authorize,async(req,res)=>{
    try {
      console.log(req.body)
    let newCart = new Cart(req.body);

    await newCart.save();
    res.json(newCart)
    } catch (e) {
      console.error(e);
      res.status(500).json({errors:[{msg:`Server Error`}]})
    }

});

router.patch('/:id',authorize,async(req,res)=>{

  try {
    let update = await User.findByIdAndUpdate(req.user.id,req.body,{new:true}).select('-password');
    res.json(update)

  } catch (e) {
    console.error(e);
    res.status(500).json({errors:[{msg:`Server Error`}]})
  }
})


export default router;
import express from 'express';
import dotenv from 'dotenv';
import {check,validationResult} from 'express-validator';
import User from '../models/userSchema.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authorize from '../middleware/auth.mjs'
dotenv.config();
const router = express.Router();

//need the authorize middle ware
router.get('/',authorize,async(req,res)=>{
  // we get the user id from authorize() via jwt token
  try {
    //we want everything other than the users password
    let user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } catch (e) {
    console.error(e);
    res.status(500).json({errors:[{msg:`Server error`}]})
  }


});





router.post('/',[
  check('email','Enter a valid email').isEmail(),
  check('password','Enter a password >6 characters').isLength({min:6})
],async(req,res)=>{

const errors = validationResult(req);
// if errors array is not empty we return the custom error message from
//express validator
if(!errors.isEmpty()){
  return res.status(400).json({errors:errors.array()})
}

const {email,password} = req.body;
  try {
     let user = await User.findOne({email});

  // so if user does not exist we return a msg of invalid credentials
  if(!user){
    return res.status(400).json({errors:[{msg:`Invalid Credentials`}]})
  };

  //check if password matches

  const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(400).json({errors:[{msg:`Invalid Credentials`}]})
    };

  const payload= {
      user:{
        id:user.id
      }
    };

  // we give the payload, the secret, option, callback function
  // if err we throw the err
  // if success we give the token
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
  res.status(500).json({errors:[{msg:`Server error`}]});
}
})






export default router;
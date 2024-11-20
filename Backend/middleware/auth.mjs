import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export default async function authorize(req,res,next){

const token = req.header('x-auth-token');

//if our token is not found we deny the intruder
if(!token){
  return res.status(401).json({errors:[{msg:`No token found, authorization denied`}]})
};

try {
  const decoded = jwt.verify(token,process.env.jwtSecret);
  // the token has our USER id and we are passing the user id to the req.user obj
  req.user = decoded.user;

  next();
} catch (e) {
  console.error(e);
  res.status(401).json({errors:[{msg:`Token not Valid`}]})
}


}
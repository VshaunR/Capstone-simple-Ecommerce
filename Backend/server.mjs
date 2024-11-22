import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/config.mjs';
import productRouter from './Routes/routes.mjs';
import userRouter from './Routes/user.mjs';
import authRouter from './Routes/auth.mjs';
import cors from 'cors';
import products from './data/products.mjs'
import Product from './models/productSchema.mjs';
import bodyParser from 'body-parser';
dotenv.config()
connectDB();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:false}));

app.use("/product",productRouter);
app.use("/user",userRouter);
app.use("/auth",authRouter);

app.get('/',(req,res)=>{
res.send("this is listening")
});


// app.get('/seed',async(req,res)=>{
  
// await Product.create(products)
// res.send('seeding product schema successful')
// })
app.listen(PORT,()=>{
  console.log(`Listening to port :${PORT}`)
})
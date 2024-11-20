import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MongoURI;

async function connectDB(){

  try {
    await mongoose.connect(connectionString);
    console.log(`Connected to mongoDB via mongoose`)

  } catch (e) {
    console.error(e);
    process.exit(1)
  }

} 

export default connectDB;
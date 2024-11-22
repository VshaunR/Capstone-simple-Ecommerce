import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";
export default function SignupComponent(){

const [formData,setFormData]= useState({
  name:'',
  email:'',
  password:''
});

const {signup,cookies} = useAuth();
const nav= useNavigate();

async function handleChange(e){
  setFormData({...formData,[e.target.name]:e.target.value})
}
async function handleSubmit(e) {
  e.preventDefault();
  await signup(formData);
  nav('/dashboard')
}

  return <div className="container">
    <main className="main ">
    <form className="form-control p-5" onSubmit={handleSubmit}>
      <h3>Register</h3>
    <div className="input-group mb-3 mt-3 input-group-s">
    <input className="form-control" type="text" name="name" onChange={handleChange} placeholder="Enter Your Name."/>
      
      <br />
      </div>
      <div className="input-group mb-3">
      <input className="form-control" type="email" name="email" onChange={handleChange} placeholder="Enter Your Email."/>
    
        <br />
      </div>
  
    <div className="input-group mb-3">
    <input className="form-control" type="password" name="password" onChange={handleChange} placeholder="Enter Your Password."/>
   
   <br />
    </div>
   
    
      <input className="btn btn-primary" type="submit" value='SignUp'/>
   
    </form>
  

  </main>
  <Footer/>
  </div>
}
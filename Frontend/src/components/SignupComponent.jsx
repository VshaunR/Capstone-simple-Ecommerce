import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";
import Footer from "./Footer";
export default function SignupComponent(){

const [formData,setFormData]= useState({
  name:'',
  email:'',
  password:''
});

const {signup,cookies} = useAuth();
const nav= useNavigate();
console.log(cookies)
async function handleChange(e){

  setFormData({...formData,[e.target.name]:e.target.value})
}
async function handleSubmit(e) {
  e.preventDefault();
  await signup(formData);
     
    nav('/dashboard')
  
}




useEffect(()=>{

},[])
  return <div className="container">
    <main className="main ">
    <form className="form-control p-5" onSubmit={handleSubmit}>
      <h3>Register</h3>
    <div className="input-group mb-3 mt-3 input-group-s">
    <input className="form-control" type="text" name="name" onChange={handleChange}placeholder="Enter Your Name." required/>
      
      <br />
      </div>
      <div className="input-group mb-3">
      <input className="form-control" type="email" name="email" onChange={handleChange} placeholder="Enter Your Email." required/>
    
        <br />
      </div>
  
    <div className="input-group mb-3">
    <input className="form-control" type="password" name="password" onChange={handleChange}placeholder="Enter Your Password." required/>
   
   <br />
    </div>
   
    
      <input className="btn btn-primary" type="submit" value='SignUp'/>
   
    </form>
  
    {console.log(formData)}
   
  </main>
  <Footer/>
  </div>
}
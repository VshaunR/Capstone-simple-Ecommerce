import { useAuth } from "../contexts/auth_context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from './Footer'
export default function LoginComponent(){

  const [formData,setFormData]=useState({
    email:'',
    password:''
  });

  const {login,cookies} = useAuth();
  const nav = useNavigate()
  async function handleChange(e) {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  async function handleSubmit(e){
    e.preventDefault();
    await login(formData);
    nav('/dashboard')
  }


  return <div className="container flex  ">

<main className="main">
 <div className="row row-cols-2">
 {cookies.token ==null?(<form className="form-control mb-3 mt-3 p-5" onSubmit={handleSubmit}>
  <h3>Login</h3>
  <div className="input-group-s mb-3 mt-3 col">
  <input className="form-control" type="email" name="email"  onChange={handleChange} placeholder="Enter Your Email."/>
  <br />
  </div>
  <div className="input-group-s mb-3 col">
  <input className="form-control" type="password" name="password"  onChange={handleChange} placeholder="Enter Your Password."/>
  <br />
  </div>
  <div className="input-group mb-3">
  <input className="btn btn-primary" type="submit" value="Login" />
  </div>
     
      
    
    </form>):(<Navigate to ='/'/>)}
 </div>
    
  </main>
  <Footer/>
  </div>

}
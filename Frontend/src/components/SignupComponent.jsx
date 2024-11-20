import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";
export default function SignupComponent(){

const [formData,setFormData]= useState({
  name:'',
  email:'',
  password:''
});

const {signup} = useAuth();
const nav= useNavigate();

async function handleChange(e){
  setFormData({...formData,[e.target.name]:e.target.value})
}
async function handleSubmit(e) {
  e.preventDefault();
  await signup(formData);
  nav('/dashboard')
}

  return <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Name
      <input type="text" name="name" onChange={handleChange}/>
      </label>
     <label>Email
     <input type="email" name="email" onChange={handleChange}/>
     </label>
    <label>
      password   
      <input type="password" name="password" onChange={handleChange}/>
    </label>
      <input type="submit"/>
    </form>

  </>
}
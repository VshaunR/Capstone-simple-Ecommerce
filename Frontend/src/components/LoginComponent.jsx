import { useAuth } from "../contexts/auth_context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function LoginComponent(){

  const [formData,setFormData]=useState({
    email:'',
    password:''
  });

  const {login} = useAuth();
  const nav = useNavigate()
  async function handleChange(e) {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  async function handleSubmit(e){
    e.preventDefault();
    await login(formData);
    nav('/dashboard')
  }


  return<>
    <form action="" onSubmit={handleSubmit}>
      <input type="text" name="email"  onChange={handleChange}/>
      <input type="text" name="password"  onChange={handleChange}/>
      <input type="submit" value="Login" />
    </form>
  </>
}
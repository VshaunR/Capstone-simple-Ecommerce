import { useAuth } from "../contexts/auth_context";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import {jwtDecode }from 'jwt-decode';
import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";
import Orders from "./Orders";
import axios from "axios";
import Footer from "../components/Footer";

export default function DashBoard(){
  const [data,setData]= useState([]);
  const [isClicked,setIsClicked]= useState(false);
 
  const {cookies,logout} = useAuth();
  const [userInfo,setUserInfo]= useState({
    name:"",
    email:""
  });


  //is token expires then logout
async function isAuth(){

      logout()
    
      alert('session expired')
 
}


  async function getUserInfo(){
    
   const token = cookies.token;
   console.log(token)
    try {
      const decoded = jwtDecode(token)
      console.log(decoded.user.id)
      const id = decoded.user.id
      let result = await fetch(`http://localhost:3000/user/${id}`,{

        headers:{
  
          'x-auth-token':`${cookies.token}`
        },
      
      })
      let data = await result.json();
      // if session expires
      if(data.errors){
        alert('Session Expired')
        logout()
      }
      setData([data])
      console.log(data)
      
    } catch (e) {
      console.error(e);
    }
  };
  // console.log(data)
  let user= data.map((item)=>{
  
    return <UserInfo info={item}/>
   
  });


async function handleChange(e) {

  try {
    setUserInfo({...userInfo,[e.target.name]:e.target.value})

  } catch (e) {
    console.error(e)
  }
};
async function handleSubmit(e){
 
  const decode = jwtDecode(cookies.token);
  const id = decode.user.id
  try {

    let result = await axios({
      method:'PATCH',
      url:`http://localhost:3000/user/${id}`,
      headers:{
        'x-auth-token':`${cookies.token}`
      },
      data:userInfo,
    })
    let data = result.data;
    setChange(false)
    console.log(data)
  } catch (e) {
    console.error(e)
  }
};


  useEffect(()=>{
   
    getUserInfo()
   
  },[cookies]);


  return <div className="container">
    <main className="dashboard main">
    <div className="userInfo">
   <nav className="nav nav-tabs justify-content-center"> 
      <a className="nav-link  m-1" onClick={()=>{setIsClicked(false)}}>User</a>
      <a className="nav-link   m-1" onClick={()=>{setIsClicked(true)}}>Change User Info</a>
      <Link to='/orders' className="nav-link m-1 " >Order Hist</Link></nav>
       
        {isClicked===false?(<p>{user}</p>):( <form action="" className="form-control" onSubmit={handleSubmit}>
          <input type="text" name="name" onChange={handleChange} placeholder="Enter Your New Name!" minLength={4} required/>
          <input type="email" name="email" id="" onChange={handleChange} placeholder="Enter Your New Email!" minLength={8} required/>
         <input type="submit" value="submit" />
          </form>)}
    </div>
 
    
  


  </main>
  <Footer/>
  </div>
}
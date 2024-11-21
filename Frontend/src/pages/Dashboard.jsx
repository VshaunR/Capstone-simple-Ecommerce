import { useAuth } from "../contexts/auth_context";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {jwtDecode }from 'jwt-decode';
import UserInfo from "../components/UserInfo";
import axios from "axios";

export default function DashBoard(){
  const [data,setData]= useState([]);
  const [isClicked,setIsClicked]= useState(false)
  const {logout,cookies} = useAuth();
  const nav = useNavigate();
  console.log(cookies)
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
      setData([data])
      console.log(data)
    } catch (e) {
      console.error(e);
    }
  };
  // console.log(data)
  let user= data.map((item)=>{
    console.log(item.name,item.email)
    return <UserInfo info={item}/>
   
  });
 
  useEffect(()=>{
    getUserInfo()
  },[cookies]);


  return <div className="dashboard">
    <div className="userInfo">
      <button onClick={()=>{setIsClicked(false)}}>User</button>
        {isClicked===false?(<p>{user}</p>):(null)}
    </div>
    <div className="orderHistory">
      <button onClick={()=>{setIsClicked(true)}}>Order Hist</button>
      {isClicked===true?(   <p>if clicked Order Histy</p>):(null)}
   
    </div>
    <p>If you made it here you have either signed up or logged in</p>


  </div>
}
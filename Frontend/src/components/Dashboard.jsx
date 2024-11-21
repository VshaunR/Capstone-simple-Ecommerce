import { useAuth } from "../contexts/auth_context";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {jwtDecode }from 'jwt-decode';
import axios from "axios";

export default function DashBoard(){

  const {logout,cookies} = useAuth();
  const nav = useNavigate();
  console.log(cookies)
  async function getUserInfo(){
   const token = cookies.token;
    try {
      const decoded = jwtDecode(token)
      console.log(decoded)

      // let result = await fetch('http://localhost:3000/auth',{

      //   headers:{
  
      //     Authorization:`Bearer ${cookies.token}`
      //   },
      
      // })
      // let data = await result.json();
      // console.log(data)
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(()=>{
    getUserInfo()
  },[cookies])
  return <>

    <h1>If you made it here you have either signed up or logged in</h1>
    <button onClick={()=>{logout()}}>LOGOUT</button>

  </>
}
import { useAuth } from "../contexts/auth_context";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import {jwtDecode }from 'jwt-decode';
import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";

import axios from "axios";




export default function Orders(){
  const [history,setHistory] = useState([]);
  const [change,setChange] = useState(false)
  const {cookies,logout} = useAuth();
 
  async function getOrderHistory(){
    const token = cookies.token;
    try {
      const decoded = jwtDecode(token)
      console.log(decoded.user.id)
      const id = decoded.user.id;
      let result = await axios(`http://localhost:3000/user/history/${id}`,{
  
        headers:{
  
          'x-auth-token':`${cookies.token}`
        },
      
      });
      let data = await result.data;
   
      
      setHistory(data)
      setChange(true)
    } catch (e) {
      console.error(e)
       
     
    }
  };

  useEffect(()=>{
  

    getOrderHistory()
  },[cookies]);
  return<div className="container">
      {history !==null? ( <>{<OrderHistory info={history}/>}</>):(<p>Chickens</p>)}

    
  </div>
}
import { useAuth } from "../contexts/auth_context";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {jwtDecode }from 'jwt-decode';
import UserInfo from "../components/UserInfo";
import OrderHistory from "../components/OrderHistory";
import axios from "axios";
import Footer from "../components/Footer";
export default function DashBoard(){
  const [data,setData]= useState([]);
  const [isClicked,setIsClicked]= useState(false);
  const [history,setHistory] = useState([])
  const {cookies} = useAuth();


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
// console.log(history)
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
  } catch (e) {
    console.error(e);
  }
}

  useEffect(()=>{
    getUserInfo()
    getOrderHistory()
  },[cookies]);


  return <div className="container">
    <main className="dashboard main">
    <div className="userInfo">
      <button onClick={()=>{setIsClicked(false)}}>User</button>
        {isClicked===false?(<p>{user}</p>):(null)}
    </div>
    <div className="orderHistory">
      <button onClick={()=>{setIsClicked(true)}}>Order Hist</button>
      {isClicked===true?(  <p>{<OrderHistory info={history}/>}</p>):(<p>Nothing here but us chickens</p>)}
   
    </div>
  


  </main>
  <Footer/>
  </div>
}
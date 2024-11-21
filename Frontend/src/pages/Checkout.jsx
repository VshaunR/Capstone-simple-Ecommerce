import { useContext, useState, useEffect } from "react";
import CartComponent from '../components/CartComponent'
import { CartContext } from "../contexts/cart_context";
import { formatCurrency } from "../utilities/CurrencyFormat.mjs";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";
import {jwtDecode }from 'jwt-decode';
import axios from "axios";
export default function Checkout(){
const [checkout,setCheckout]= useState([])
const{cookies}= useAuth();

async function displayCheckout(){
  const decode = jwtDecode(cookies.token);
  const id = decode.user.id
  try {
      const result = await axios(`http://localhost:3000/user/cart/${id}`,{
        headers:{
          'x-auth-token':`${cookies.token}`
        }
      })
      const data = result.data
      setCheckout(data)
  } catch (e) {
    console.error(e)
  }
}

useEffect(()=>{
  displayCheckout()
  console.log(checkout)
},[])
return<div>
   <div className="card">
    <img src="./vite.svg"/>
    <div className="descr">
   
    </div>


    
    <div>
       <div> 
       <button onClick={()=>{add(data)}} >Add 1 to Cart</button>
   
        <button onClick={()=>{minus(data)}}>Minus 1 to Cart</button>
      
      </div>

    </div>
  </div>
  <form action="">

  </form>
</div>

}
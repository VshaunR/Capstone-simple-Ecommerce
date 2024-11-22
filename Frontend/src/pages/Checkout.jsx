import { useContext, useState, useEffect } from "react";
import CartComponent from '../components/CartComponent'
import { CartContext } from "../contexts/cart_context";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";
import {jwtDecode }from 'jwt-decode';
import axios from "axios";
import CheckoutComponent from "../components/CheckoutComponent";
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
      setCheckout(data.Product)
  } catch (e) {
    console.error(e)
  }
};

let list = checkout.map((item)=>{
return <CheckoutComponent data={item}/>
})
console.log(checkout)
useEffect(()=>{
  displayCheckout()
 
},[])
return <div className="container">
  <main className="checkout main">
{list}
<Link to='/thankyou'>Order</Link>
</main>
<Footer/>
</div>

}
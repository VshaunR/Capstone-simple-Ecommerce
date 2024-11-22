import { useContext, useState, useEffect } from "react";
import CartComponent from '../components/CartComponent'
import { CartContext } from "../contexts/cart_context";
import { formatCurrency } from "../utilities/CurrencyFormat.mjs";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";
import {jwtDecode }from 'jwt-decode';
import axios from "axios";
import Footer from "../components/Footer";
export default function Cart(){
const {cart,remove,add}= useContext(CartContext);
const{cookies}= useAuth()
const [isEmpty,setIsEmpty]= useState(false);
const [product,setProducts]= useState([])


let productId=[]
let idList= cart.map((item)=>{
productId.push(item)
})
// console.log(productId)

async function addToCart(){
  const token = cookies.token
  try {
    const decoded = jwtDecode(token)
    console.log(decoded.user.id)
    const id = decoded.user.id
    const cart = await axios.post(`http://localhost:3000/user/cart`,{
      UserId:`${id}`,
      Product:product,
 

    },{
      headers:{
        'x-auth-token': `${token}`
      }

    })

  } catch (e) {
    console.error(e)
  }
}

//grandtotal of entire cart
   let grandTotal=0;
   let total=0;
   let items = cart.forEach((item)=>{
   total =item.price *item.quantity;
   grandTotal = grandTotal +total
   });
  
   let card = cart.map((item)=>{

    return <CartComponent key={item.id} data={item}/>})
   console.log(grandTotal)
   console.log(total)

    useEffect(()=>{
      setProducts(productId)
    },[])
  return <div className="container">
    <main className="main">
    {card}

    <p>{formatCurrency(grandTotal)}</p>   
    {cookies.token?(<Link to='/thankyou' onClick={()=>{addToCart()}}>ChecKOut</Link>):(<Link to='/signup'><button className="btn sign-up">Create an Account to Purchase</button></Link>)}
    </main>
    <Footer/>
  </div>
}
import { useContext, useState } from "react";
import CartComponent from '../components/CartComponent'
import { CartContext } from "../contexts/cart_context";
import { formatCurrency } from "../utilities/CurrencyFormat.mjs";


export default function Cart(){
const {cart,remove,add}= useContext(CartContext)
const [isEmpty,setIsEmpty]= useState(false);
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
  return <div className="shoppingCart">
    {card}

    <p>{grandTotal}</p>   
  </div>
}
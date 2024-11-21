import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart_context";
import { formatCurrency } from "../utilities/CurrencyFormat.mjs";

export default  function CartComponent({data}){

const {remove,minus,add} = useContext(CartContext)
//individual item total
let individualTotal = (data.price * data.quantity)   
// console.log(data)
  return(<div className="shoppingCart">
    <div className=" card">
    {<img src="/vite.svg"/>}
    <p>{data.name}</p>

    <p>{data.quantity}</p>
    <button onClick={()=>{remove(data)}}>Remove</button>
    <button onClick={()=>{add(data)}}>Add</button>
    <button onClick={()=>{minus(data)}}>Minus</button>
    
    <p>{formatCurrency(individualTotal)}</p>
  </div>
   
  </div>)
}
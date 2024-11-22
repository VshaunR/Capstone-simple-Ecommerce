import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart_context";
import { formatCurrency } from "../utilities/CurrencyFormat.mjs";

export default  function CartComponent({data}){
const {url}= data;
console.log(data)
const {remove,minus,add} = useContext(CartContext)
//individual item total
let individualTotal = (data.price * data.quantity)   
// console.log(data)
  return(<div className="container-fluid ">
   <main className="main ">
   <div className="card text-center" style={{width:"12rem"}}>
   <div className="card-body ">
   {<img className="card-img-top" src={url}/>}
    <p className="card-title ">{data.name}</p>

    <p className="card-title">{data.quantity}</p>
    <button className="btn btn-danger m-1" onClick={()=>{remove(data)}}>Remove</button>
    <button className="btn btn-primary m-1" onClick={()=>{add(data)}}>+</button>
    <button className="btn btn-info m-1" onClick={()=>{minus(data)}}>-</button>
    
    <p>{formatCurrency(individualTotal)}</p>
   </div>
  </div>
   
   </main>
  </div>)
}
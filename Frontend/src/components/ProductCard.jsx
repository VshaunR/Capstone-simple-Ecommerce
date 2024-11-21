import { useContext, useState } from "react";
import { formatCurrency } from "../utilities/CurrencyFormat.mjs";
import { CartContext } from "../contexts/cart_context";

export default function ProductCard({data}){
  const {name,price,_id,category}= data;

  const {add,cart,minus,remove,setQuant} = useContext(CartContext);

//  console.log(data)
  return <div className="card">
    <img src="./vite.svg"/>
    <div className="descr">
    <p>{name}</p>
    <p>{formatCurrency(price)}</p>
    </div>


    
    <div>
       <div> 
       <button onClick={()=>{add(data)}} >Add 1 to Cart</button>
       <select  >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
       </select>
        <button onClick={()=>{minus(data)}}>Minus 1 to Cart</button>
      
      </div>

    </div>
  </div>
}
import { useContext, useState } from "react";
import { formatCurrency } from "../utilities/CurrencyFormat.mjs";
import { CartContext } from "../contexts/cart_context";

export default function ProductCard({data}){
  const {name,price,_id,category,url}= data;

  const {add,cart,minus,remove,setQuant} = useContext(CartContext);

//  console.log(data)
  return <div className="card text-center" style={{width:'15rem'}} >
    
    <div className="card-body">
    <img  className ="card-img-top"src={url}/>
    <p className ="card-title">{name}</p>
    <p className ="card-text">{formatCurrency(price)}</p>
    </div>


    
    <div>
       <div> 
       <button className="btn btn-primary m-1 p-2" onClick={()=>{add(data)}} >+</button>
   
        <button className="btn btn-danger m-1 p-2" onClick={()=>{minus(data)}}>-</button>
      
      </div>

    </div>
  </div>
}
import { useState,useEffect } from "react";
import {formatCurrency} from '../utilities/CurrencyFormat.mjs'
export default function OrderHistory({info}){

console.log(info)
let arr=[];
info.forEach((item)=>{
  // console.log(item)
  item.Product.forEach((x)=>{
    // console.log(x)
    arr.push(x)
  })
})
// console.log(arr)

let y =arr.map((item)=>{
  // console.log(item)
  if(item._id ===item._id){
    return <div className="card">
    <div className="card-body">
    <img  style={{width:'20%'}} src={item.url}/>
      <p className="card-title">ProductName:{item.name}</p>
      <p> ProductPrice: {formatCurrency(item.price)}</p>
      <p> Quantity: {item.quantity}</p>
      <p> Total: {formatCurrency(item.price*item.quantity)}</p>
    </div>
  </div>
  }
})
  return <div className="history">
  {y?(y):(<h1>No Items Listed!</h1>)}
  </div>
}
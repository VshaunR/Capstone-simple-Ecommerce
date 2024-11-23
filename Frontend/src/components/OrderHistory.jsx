import { useState,useEffect } from "react";

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
  console.log(item)
  if(item._id ===item._id){
    return <div className="card">
    <div className="card-body">
    <img  style={{width:'20%'}} src={item.url}/>
      <p className="card-title">ProductName:{item.name}</p>
      <p> ProductPrice: {item.price}</p>
      <p> Quantity: {item.quantity}</p>
    </div>
  </div>
  }
})
  return <div className="history">
  {y}
  </div>
}
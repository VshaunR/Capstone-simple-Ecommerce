import { useState,useEffect } from "react";

export default function OrderHistory({info}){

// console.log(info)
let arr=[];
info.forEach((item)=>{
  // console.log(item)
  item.Product.forEach((x)=>{
    // console.log(x)
    arr.push(x)
  })
})
// console.log(arr)
let name;
let y =arr.map((item)=>{
  console.log(item.name)
  return <div className="card">
      <p>{item.name}</p>
      <p>{item.price}</p>
      <p>{item.quantity}</p>
  </div>
})
  return <div className="history">
  {y}
  </div>
}
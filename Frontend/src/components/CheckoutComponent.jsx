import { formatCurrency } from "../utilities/CurrencyFormat.mjs";
export default function CheckoutComponent({data}){

const {name,price,quantity}= data

  return <div className="checkoutCard">
     <img src="./vite.svg"/>
    
    <p>{name}</p>
    <p>{quantity}</p>
    <p>{formatCurrency(price)}</p>
    

 
  </div>
}
import { useContext,createContext,useState,useMemo } from "react";

export const CartContext = createContext();


export function CartProvider({children}){
const [cart,setCart]= useState([]);

function cartQuantity(){
 let temp=0;
cart.forEach(item=>{
 temp = item.quantity +temp
})
return temp;
}





function add(data){

  setCart(cart =>{
    //if I cant find  an item with the id i passed
    //as in if this item is not in the cart then I
    if(!cart.find(item=>item._id ===data._id)){
      //return and array with the cart and item with id and quantity of 1
      return [...cart,{_id:data._id,name:data.name,price:data.price,url:data.url,quantity:1}]
    }else{
      
      //map through the cart array 
      return cart.map(item=>{
        //if the item is already in the cart  then
        if(item._id ===data._id){
          //then target the item that matches the id and increase its quantity by one
          return {...item,quantity:item.quantity+1}
        }else{
          // if alll else fails return the current item
          return item
        }
      })
    }
  })
   

};


function minus(data){

  setCart(cart =>{
    //look for the item with an id that matches and the quantity must be 1
    //if it is and when the button is clicked
    //the item is FILTERED out of the cart array
    if(cart.find(item=>item._id ===data._id && item.quantity ===1)){
       return cart.filter(item=>item._id!==data._id)
    }else{
      //map through the cart
      return cart.map(item=>{
        //if item id is === to the id we pass
        if(item._id ===data._id){
        //we modify that individual items quantity
        //this decreased the total cart quantity sooo..
        // 
          return {...item,quantity:item.quantity-1}
        }else{
          return item
        }
      })
    }
  })


};
function remove(data){
  // this will remove the individual item only if its id===id so
  //maybe this will be primarily be in the cart while the add will be on the productcard component
setCart(cart=>{
  return cart.filter(item=>item._id !== data._id)
})
}
const value = {
  add,
  remove,
  minus,
  cart,
  cartQuantity,
}
  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}
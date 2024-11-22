import { useState , useEffect } from "react";
import Footer from "../components/Footer";
import axios  from 'axios';
import ProductCard from "../components/ProductCard";
export default function Home(){
const [apiData,setAPIData]= useState([])
const [cart,setCart] = useState([]);

  async function getProducts(){
    // this should be where I make a API call to my backend for a list of products
    //using swapi for testing purposes
    try {
      
      let result = await axios.get( 'http://localhost:3000/product')
      let data = result.data;
  
      // console.log(arr)
      setAPIData(data)
    
    } catch (e) {
      console.error(e);
    }
  }
  // console.log(apiData)
  

console.log(cart)
  let card = apiData.map((item)=>{
    
  return <ProductCard key={item._id} data={item} cart={cart} setCart={setCart} />
})
// console.log(cart)
  useEffect(()=>{
    getProducts()
  },[])
  return <div className="container">
    <main className="home main">
    {card}
      

  </main>
  <Footer/>
  </div>


}
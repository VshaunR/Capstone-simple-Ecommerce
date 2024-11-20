import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/cart_context";
export default function NavBar(){

  const {cartQuantity,cart}= useContext(CartContext)
  return <nav className="navbar">
    <Link to='/'>Home</Link>
    
    <Link to='/login'>Login</Link>
    <Link to='/signup'>Signup</Link>
    <Link to='/dashboard'>Dashboard</Link>
    <Link to='/cart'>
    <button>
      Shopping Cart
      <div className="cart-num">{cartQuantity()}</div>
      </button></Link>
  </nav>
}
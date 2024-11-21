import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/cart_context";
import { useAuth } from "../contexts/auth_context";
export default function NavBar(){
  const{cookies,logout} = useAuth()
  const {cartQuantity,cart}= useContext(CartContext)
  return <nav className="navbar">
    <Link to='/'>Home</Link>
    

      {cookies.token? (null):(<Link to='/signup'>Signup</Link>)}
    <Link to='/dashboard'>Dashboard</Link>
    <Link to='/cart'>
    <button>
      Shopping Cart
      <div className="cart-num">{cartQuantity()}</div>
      </button></Link>
      {cookies.token ? (<button onClick={()=>{logout()}}>Logout</button>):( <Link to='/login'>Login</Link>)}
  </nav>
}
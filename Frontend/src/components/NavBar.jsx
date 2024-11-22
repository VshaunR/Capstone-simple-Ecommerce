import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/cart_context";
import { useAuth } from "../contexts/auth_context";
export default function NavBar(){
  const{cookies,logout} = useAuth();
  const {cartQuantity,cart}= useContext(CartContext);


  
  return <nav className="navbar navbar-expand-3 bg-body-tertiary ">
    <Link to='/' className="navbar-brand">Home</Link>
    

    <Link className="navbar-brand" to='/dashboard'>Dashboard</Link>
    <Link className="navbar-brand" to='/cart'>
    <button className="btn cart-btn btn btn-success">
   
      <div className="cart-num">  <span className=" m-1"> Shopping Cart:</span>{cartQuantity()}</div>
      </button></Link>
      
      {cookies.token? (null):(<Link className="navbar-brand" to='/signup'><button className="btn btn-dark">Signup</button></Link>)}
      {cookies.token ? (<button className="btn btn-primary" onClick={()=>{logout()}}>Logout</button>):( <Link className="navbar-brand btn" to='/login'><button className="btn btn-secondary">Login</button></Link>)}
  </nav>
}
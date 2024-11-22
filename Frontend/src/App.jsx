import { useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import AuthProvider from './contexts/auth_context';
import './App.css'
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import DashBoard from './pages/Dashboard';
import ProtectRoute from './components/ProtectedRoutes';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { CartProvider } from './contexts/cart_context';
import ThankYou from './pages/ThankYou';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {


  return (
    <>
   
      <CartProvider>
      <NavBar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/thankyou' element={<ThankYou/>}/>
      <Route path='/login' element={<LoginComponent/>}/>
      <Route path='/signup' element={<SignupComponent/>} />
      <Route element ={<ProtectRoute/>}>
      <Route path='/dashboard' element={<DashBoard/>} />
      </Route>
     </Routes>
     </CartProvider>

    </>
  )
}

export default App

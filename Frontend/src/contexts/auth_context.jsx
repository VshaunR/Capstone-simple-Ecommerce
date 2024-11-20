import {useState,createContext,useContext,useMemo} from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

//createing my context
const AuthContext = createContext();

//creating function that houses state functions i need to export

export default function AuthProvider({children}){

  //for handling cookies
const [cookies,setCookie,removeCookie] = useCookies();

//these functions will make a call to MY API for the login, signup
async function login(formData){
  try {
    let result = await axios({
      method:'POST',
      url:'http://localhost:3000/auth',
      data:formData
    })
      setCookie('token',result.data.token)

  } catch (e) {
    console.error(e);
  }

};
async function signup(formData){
  try {
    let result = await axios({
      method:'POST',
      url:'http://localhost:3000/user',
      data:formData,
    })

    setCookie('token',result.data.token)
  } catch (e) {
    console.error(e);
  };
};

async function logout() {
  ['token'].forEach((cookie)=>{
    removeCookie(cookie)
  })
};
  
const value = useMemo(()=>({
  cookies,
  login,
  signup,logout
}),[cookies])

return <AuthContext.Provider value={value}>
  {children}
</AuthContext.Provider>

};

export function useAuth(){
  return useContext(AuthContext)
}
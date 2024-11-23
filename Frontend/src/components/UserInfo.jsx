import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import  {useAuth} from '../contexts/auth_context';

export default function UserInfo({info}){

const {cookies}= useAuth();
//destructuring info
const{name,email}= info;

async function handleChange(e) {

  try {
    setUserInfo({...userInfo,[e.target.name]:e.target.value})

  } catch (e) {
    console.error(e)
  }
};
async function handleSubmit(e){
 
  const decode = jwtDecode(cookies.token);
  const id = decode.user.id
  try {

    let result = await axios({
      method:'PATCH',
      url:`http://localhost:3000/user/${id}`,
      headers:{
        'x-auth-token':`${cookies.token}`
      },
      data:userInfo,
    })
    let data = result.data;
  
    console.log(data)
  } catch (e) {
    console.error(e)
  }
};


useEffect(()=>{
 
},[info])
return(<div>
  
  <p>{name}</p>
  <p>{email}</p>

 

 

</div>)

}
import { useAuth } from "../contexts/auth_context";
import { useNavigate } from "react-router-dom";
export default function DashBoard(){

  const {logout} = useAuth();
  const nav = useNavigate();
  return <>

    <h1>If you made it here you have either signed up or logged in</h1>
    <button onClick={()=>{logout()}}>LOGOUT</button>

  </>
}
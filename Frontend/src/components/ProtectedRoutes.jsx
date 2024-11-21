import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";
import { useNavigate,Navigate } from "react-router-dom";

export default function ProtectRoute(){
const {cookies}= useAuth();
const nav = useNavigate()
//i can redirect the user to the login page


return <>
  {cookies.token? (<Outlet/>):(<Navigate to='/login'/>)}

</>
}
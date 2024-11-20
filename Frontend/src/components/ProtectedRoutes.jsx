import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";


export default function ProtectRoute(){
const {cookies}= useAuth();
return cookies.token? <Outlet/> :<h1>What am I going to put here????????</h1>
}
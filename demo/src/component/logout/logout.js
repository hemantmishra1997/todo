import React ,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./logout.css"

function Logout(){
    let navigate = useNavigate();
    useEffect(()=>{
        
        localStorage.clear();
        navigate('./login')
    })
    return(
        <div id="logout-div">
            <h1>h</h1>
            
            
        </div>
    )
}
export default Logout
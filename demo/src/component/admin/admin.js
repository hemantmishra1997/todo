import React ,{useState} from "react";
import { Link ,useNavigate } from "react-router-dom";
import "./admin.css";

function Admin(){
    let navigate = useNavigate()
    const adminDetail = localStorage.getItem("email");

    //LOGOUT EVENT HANDLER
    const logoutHandler = ()=>{
        localStorage.clear();
        navigate('../login')
    }
    return(
        <div id="admin-div">
            <span>Welcome admin :- {adminDetail}</span>
            <br/>
            <br/>
            <div logout-div>
                <center>
                <button type="button" onClick={logoutHandler}>Logout</button>   

                </center>
            </div>
        </div>
    )
}
export default Admin
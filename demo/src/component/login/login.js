import React, { useState } from "react";
import "./login.css";
import axios from "axios"
import { Link } from "react-router-dom";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
      email:"",
      password:""
  });

  const apiUrl = "http://localhost:3010/webapi/loginuser"

  //submit event
  function submitHandler(e){
    e.preventDefault()
    axios.post(apiUrl,loginDetails).then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err)
    })
    
  };

  return (
    <div id="login-div">
      <center>
          <h3><u>Login User</u></h3>
        <form >
          <table>
            <tr>
              <th>Email</th>
              <td>
                <input type="text" onChange={e => setLoginDetails({...loginDetails,email:e.target.value})} value={loginDetails.email} placeholder="email" />
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <input
                  type="password"
                  onChange={e=>setLoginDetails({...loginDetails,password:e.target.value})}
                  value={loginDetails.password}
                  placeholder="password"
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>
                <center>
                  <button onClick={submitHandler}>login</button>
                </center>
              </th>
            </tr>
          </table>
        </form>
        <span>User is new , register here</span>
        <br />
      <Link to="../register"> <button type="button">Register</button> </Link>
      </center>
    </div>
  );
}
export default Login;

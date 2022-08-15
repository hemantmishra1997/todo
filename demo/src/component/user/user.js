import React, { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import Userlist from "./userList";
import axios from "axios";
import "./user.css";

function User() {
  const apiURlFetchTask = "http://localhost:3010/webapi/fetchTask"
  const userDetail = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  let navigate = useNavigate();

  //useEffect Hook
  useEffect(()=>{
    getItems()
  })

  //logout handler
  const logoutHandler = () => {
    localStorage.clear();
    navigate("../login");
  };    

  //webapi for get data defination 
  const getItems = ()=> {
    axios.get(apiURlFetchTask , {headers: {Authorization: 'Bearer ' + token }}).then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.log(err);
    })
    
  }
  return (
    <div id="user-div">
      <span>
        <u>Welcome User </u>:- {userDetail}
      </span>
      <br />
      
      <center>
        <div form-div>
          <form>
              <table>
                <tr>
                  <td>Add Task</td>
                  <td><input type="text" placeholder="enter task"/></td>
                </tr>
              </table>
          </form>
          </div>
        <Userlist />
        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      </center>
    </div>
  );
}
export default User;

import React, { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import Userlist from "./userList";
import axios from "axios";
import "./user.css";

function User() {
  const [task ,setTask] = useState() 
  const apiURlFetchTask = "http://localhost:3010/webapi/fetchTask";
  const apiURladdTask = "http://localhost:3010/webapi/addTask";
  const userDetail = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  let navigate = useNavigate();

  //useEffect Hook
  useEffect(() => {
    getItems();
  });

  //logout handler
  const logoutHandler = () => {
    localStorage.clear();
    navigate("../login");
  };

  //webapi for get data defination
  const getItems = () => {
    axios
      .get(apiURlFetchTask, { headers: { Authorization: "Bearer " + token } })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //inputfield data
  const taskHandler = (e)=>{
    setTask(e.target.value)
  }
  
  //add data handler event
  const addDataHandler = (e)=>{
    e.preventDefault()
    axios.post(apiURladdTask,task, {headers: { Authorization: "Bearer " + token } }).then((result)=>{
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
                <th>Add Task</th>
                <td>
                  <input type="text" onChange={taskHandler} placeholder="enter task" />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <center>
                    <button type="button" onClick={addDataHandler}>Add Task</button>
                  </center>
                </td>
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

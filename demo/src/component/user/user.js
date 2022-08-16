import React, { useEffect , useState} from "react";
import {useNavigate} from "react-router-dom";
import Userlist from "./userList";
import axios from "axios";
import "./user.css";

function User() {
  const [addTask ,setAddTask] = useState({
    task:"",
    time:""
  }) 
  const [result ,setResult] = useState({})
  const [output ,setOutput] = useState("")
  const apiURlFetchTask = "http://localhost:3010/webapi/fetchTask";
  const apiURladdTask = "http://localhost:3010/webapi/addTask";
  const userDetail = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  let navigate = useNavigate();

  //useEffect Hook
  useEffect(() => {
    getItems();
  },[]);

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
        //console.log(result.data.response.length);
        setResult(result.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  //add data handler event
   const addDataHandler = (e)=>{
    e.preventDefault()
    console.log(addTask);
    axios.post(apiURladdTask, addTask , {headers: {Authorization: "Bearer " + token } }).then((result)=>{
      setOutput(result.data.response);
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
          <small>{output}</small>
          <form>
            <table>
              <tr>
                <th>Add Task</th>
                <td>
                  <input type="text" onChange={(e)=>setAddTask({...addTask,"task":e.target.value})}  placeholder="enter task" />
                </td>
              </tr>
              <tr>
                <th>Reminder</th>
                <td>
                  <input type="time" onChange={(e)=>setAddTask({...addTask,"time":e.target.value})}  />
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
        <hr/>
        <Userlist items={result}/>
        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      </center>
    </div>
  );
}
export default User;

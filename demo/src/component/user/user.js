import React, { useEffect , useState} from "react";
import {useNavigate} from "react-router-dom";
import Userlist from "./userList";
import Userrunninglist from "./userRunningList";
import axios from "axios";
import "./user.css";

function User() {
  const [addTask ,setAddTask] = useState({
    task:"",
    time:""
  }) 
  const [initalResult ,setinitalResult] = useState([])
  const [output ,setOutput] = useState("")
  const apiURlFetchTaskInital = "http://localhost:3010/webapi/fetchTask?state=Initial";
  const apiURlFetchTaskRunning = "http://localhost:3010/webapi/fetchTask?state=running";
  const apiURlFetchTaskDone = "http://localhost:3010/webapi/fetchTask?state=done";

  const apiURladdTask = "http://localhost:3010/webapi/addTask";
  const userDetail = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  let navigate = useNavigate();

  //useEffect Hook
  useEffect(() => {
    getItemsInitial();
    getItemsRunning();
    getItemsDone();
  },[]);

  //logout handler
  const logoutHandler = () => {
    localStorage.clear();
    navigate("../login");
  };

  //webapi for get initial data defination
  const getItemsInitial = () => {
    axios
      .get(apiURlFetchTaskInital, { headers: { Authorization: "Bearer " + token } })
      .then((result) => {
        //console.log(result.data.response.length);
        setinitalResult(result.data.response);
        //
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  //webapi for get running data defination
  const getItemsRunning = () => {
    axios
      .get(apiURlFetchTaskRunning, { headers: { Authorization: "Bearer " + token } })
      .then((result) => {
        console.log(result.data.response);
       // (result.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //webapi for get done data defination
  const getItemsDone = () => {
    axios
      .get(apiURlFetchTaskDone, { headers: { Authorization: "Bearer " + token } })
      .then((result) => {
        console.log(result.data.response);
       // setResult(result.data.response);
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
      setAddTask.time("")
      setAddTask.task("")

      getItemsInitial();
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
                  <input type="text" onChange={(e)=>setAddTask({...addTask,"task":e.target.value})} value={addTask.task} placeholder="enter task" />
                </td>
              </tr>
              <tr>
                <th>Reminder</th>
                <td>
                  <input type="time" value={addTask.time} onChange={(e)=>setAddTask({...addTask,"time":e.target.value})}  />
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
        <Userlist items={initalResult}/>
        <hr/>
        < Userrunninglist  />
        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      </center>
    </div>
  );
}
export default User;

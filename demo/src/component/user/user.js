import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./user.css";
import Userlist from "./userList";
import Userdonelist from "./userDoneList";
import Userrunninglist from "./userRunningList";
import Addtask from "./addTask";

function User() {
  const [initalResult, setinitalResult] = useState([]);
  const [runningResult, setRunningResult] = useState([]);
  const [output, setOutput] = useState("");
  const [doneResult, setDoneResult] = useState([]);
  const apiURlFetchTaskInital =
    "http://localhost:3010/webapi/fetchTask?state=Initial";
  const apiURlFetchTaskRunning =
    "http://localhost:3010/webapi/fetchTask?state=running";
  const apiURlFetchTaskDone =
    "http://localhost:3010/webapi/fetchTask?state=done";
  const apiURladdTask = "http://localhost:3010/webapi/addTask";
  const apiUrlUpdateState = "http://localhost:3010/webapi/";

  const userDetail = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  let navigate = useNavigate();

  //useEffect Hook
  useEffect(() => {
    getItemsInitial();
    getItemsRunning();
    getItemsDone();
  }, []);

  //logout handler
  const logoutHandler = () => {
    localStorage.clear();
    navigate("../login");
  };

  //webapi for get initial data defination
  const getItemsInitial = () => {
    axios
      .get(apiURlFetchTaskInital, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((result) => {
        setinitalResult(result.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //webapi for get running data defination
  const getItemsRunning = () => {
    axios
      .get(apiURlFetchTaskRunning, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((result) => {
        setRunningResult(result.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //webapi for get done data defination
  const getItemsDone = () => {
    axios
      .get(apiURlFetchTaskDone, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((result) => {
        setDoneResult(result.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //add data handler event
  const addTask = (newTask) => {
    axios
      .post(apiURladdTask, newTask, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((result) => {
        setOutput(result.data.response);
        getItemsInitial();
        getItemsRunning();
        getItemsDone();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //update State
  const updateState = (id, state) => {
   var data = { "state": state };
    axios.put(apiUrlUpdateState + id, data, {
      headers: { Authorization: "Bearer " + token },
    }).then((result)=>{
      setOutput(result.data.response);
      getItemsInitial();
      getItemsRunning();
      getItemsDone();
    })
  };
  return (
    <div id="user-div">
      <span>
        <u>Welcome User </u>:- {userDetail}
      </span>
      <br />
      <center>
        <Addtask onAdd={addTask} oput={output} />
        <hr />
        <Userlist items={initalResult} changeState={updateState} />
        <hr />
        <Userrunninglist runningItems={runningResult} changeState={updateState} />
        <hr />
        <Userdonelist doneItems={doneResult} changeState={updateState}/>
        <hr />
        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      </center>
    </div>
  );
}
export default User;

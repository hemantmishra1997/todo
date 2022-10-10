import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./user.css";
import Userlist from "./userList";
import Userdonelist from "./userDoneList";
import Userrunninglist from "./userRunningList";
import Addtask from "./addTask";


function User(props) {
  const [initalResult, setinitalResult] = useState([]);
  const [runningResult, setRunningResult] = useState([]);
  const [doneResult, setDoneResult] = useState([]);
  const [output, setOutput] = useState("");
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
  const provider  = localStorage.getItem("provider")
  let navigate = useNavigate();

  //useEffect Hook
  useEffect(() => {
    
    // const socket = socketIOClient(ENDPOINT);
    // socket.on("hello", (arg, callback) => {
    //   console.log(arg);
    //   if(arg.length==0)
    //   {
    //     console.log("null data");
    //   }
    //   else
    //   toast(arg[0].task);
    //   callback("massgae passed sucessfully");
    // });

     getItemsInitial();
    getItemsRunning();
    getItemsDone();
     props.cRole();
  },[]);

  //logout handler
  const logoutHandler = () => {
    localStorage.clear();
    navigate("../");
    props.cRole();
  };

  //webapi for get initial data defination

  const getItemsInitial =  () => {
    // setLoader(true);
    setTimeout(() => {
      axios
        .get(apiURlFetchTaskInital, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((result) => {
          // setLoader(false);
          if(result.status==201)
          {
            setOutput(result.data.response)
          }
          else
          {
            setinitalResult(result.data.response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 100);
  };

  //webapi for get runnning data defination
  // setLoaderForRunning(true)
  const getItemsRunning = () => {
    setTimeout(()=>{
      axios
        .get(apiURlFetchTaskRunning, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((result) => {

          if(result.status==201)
          {
            setOutput(result.data.response)
          }
          else
          {
            setRunningResult(result.data.response);
          }
        })

          // setLoaderForRunning(false)
        
        .catch((err) => {
          console.log(err);
        });
    },100)
  };

  //webapi for get done data defination
  const getItemsDone = () => {
    axios
      .get(apiURlFetchTaskDone, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((result) => {

        if(result.status==201)
          {
            setOutput(result.data.response)
          }
          else
          {
            setDoneResult(result.data.response);
          }
        })
      .catch((err) => {
        console.log(err);
      });
  };

  //add data handler event
  const addTask = async(newTask) => {
    if(provider)
    {
      console.log("xxxxx");
      const result = await axios
      .post("http://localhost:3010/webapi/addTaskByFacebook", newTask, {
        headers: { Authorization: token },
      })
      console.log(result);
    }
    else{
      console.log("yyyyy");

      const result = await axios
      .post(apiURladdTask, newTask, {
        headers: { Authorization: "Bearer " + token },
      })
      console.log(result);
        setOutput(result.data.response);
        getItemsInitial();
        getItemsRunning();
        getItemsDone();
      
    }
  };

  //update State
  const updateState = (id, state) => {
    // console.log(id,state);
    var data = { state: state };
    axios
      .put(apiUrlUpdateState + id, data, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((result) => {
        setOutput(result.data.response);
        getItemsInitial();
        getItemsRunning();
        getItemsDone();
      });
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
        <Userlist
          items={initalResult}
          changeState={updateState}
          //  mLoader={loader}
        />
        <hr />
        <Userrunninglist
          runningItems={runningResult}
          changeState={updateState}
          //mloader = {loaderForRunning}
        />
        <hr />
        <Userdonelist doneItems={doneResult} changeState={updateState} />
        <hr />
        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      </center>
    </div>
  );
  
}
{/* <ToastContainer/> */}
export default User;

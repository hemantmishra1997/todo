import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/header/header";
import Mainnavigation from "./component/nav-bar/mainnavigation";
import Login from "./component/login/login";
import Register from "./component/register/register";
import User from "./component/user/user";
import Admin from "./component/admin/admin";
import Footer from "./component/footer/footer";
import axios from "axios";

import { fetchToken, onMessageListener } from "./messaging_init_in_sw.js";
import { async } from "@firebase/util";
axios.defaults.baseURL = "http://localhost:3010/";

function App() {
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");

  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [getFcmToken, setFcmToken] = useState("");

  // fetchToken(setTokenFound,setFcmToken);
  // // console.log(setFcmToken);
  // onMessageListener().then(payload =>{
  //   setNotification({title:payload.notification.title,body:payload.notification.body})

  // }).catch(err => console.log('failed',err));
  useEffect(() => {
    // axios.get("http://localhost:3010/auth/facebook/success/").then((result) => {
    //   console.log(result);
    // });
    checkRole();
  });
  const checkRole = () => {
    setRole(localStorage.getItem("role"));
  };

  return (
    <div className="app">
      <Header />

      <Mainnavigation roleState={role} />
      <br />

      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/user" /> : <login />}
        ></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/user" element={<User cRole={checkRole} />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

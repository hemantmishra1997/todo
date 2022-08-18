import React,{useState,useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./component/header/header";
import Mainnavigation from "./component/nav-bar/mainnavigation";
import Login from "./component/login/login";
import Register from "./component/register/register";
import User from "./component/user/user";
import Admin from "./component/admin/admin";
// import Logout from './component/logout/logout';
import Footer from "./component/footer/footer";

function App() {
  const [role, setRole] = useState("");
  useEffect(() => {
      checkRole()
  });
  const checkRole = ()=>{
    setRole(localStorage.getItem("role"));
  }

  return (
    <div className="app">
      <Header />

      <Mainnavigation roleState={role} />
      <br />

      <Routes>
        <Route path="/login" element={<Login />}></Route>
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

import React from "react";
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
  return (
    <div className="app">
      <Header />

      <Mainnavigation />
      <br />

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

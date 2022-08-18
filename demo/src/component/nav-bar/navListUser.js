import React,{useState} from "react";
import "./navListUser.css";
import { NavLink } from "react-router-dom";

function Navlistuser() {
  
  return (
    <div id="nav-div">
      <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  );
}
export default Navlistuser;

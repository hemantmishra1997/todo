import React from "react";
import "./navList.css";
import { NavLink } from "react-router-dom";

function NavList() {
  return (
    <div id="nav-div">
      <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </div>
  );
}
export default NavList;

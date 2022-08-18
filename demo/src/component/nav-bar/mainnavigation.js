import React, { useEffect, useState } from "react";
import "./mainnavigation.css";
import Navlistuser from "./navListUser";
import NavList from "./navlist";

function Mainnavigation() {
  const [role, setRole] = useState("");
  useEffect(() => {
    
      checkRole()
    
  });
  const checkRole = ()=>{
    setRole(localStorage.getItem("role"));
  }

  if(role === "user") {
    return (
      <nav>
        <Navlistuser />
      </nav>
    );
  } else if (role === "admin") {
    return (
      <nav>
        <Navlistuser />
      </nav>
    );
  } else
    return (
      <nav>
        <NavList />
      </nav>
    );
}
export default Mainnavigation;

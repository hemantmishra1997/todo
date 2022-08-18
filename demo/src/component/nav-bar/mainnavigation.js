import React, { useEffect, useState } from "react";
import "./mainnavigation.css";
import Navlistuser from "./navListUser";
import NavList from "./navlist";

function Mainnavigation(props) {
 console.log(props.roleState);
  if(props.roleState === "user") {
    return (
      <nav>
        <Navlistuser />
      </nav>
    );
  } else if (props.roleState === "admin") {
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

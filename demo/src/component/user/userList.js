import React from "react";
import Useritem from "./userItem";
import "./userItem.css";

function Userlist(props) {
  
  const stateChanege = (id,state)=>{
    props.changeState(id,state)
  }


  if (props.items.length === 0) {
    return (
      <div>
        <small>
          <u>This is initial</u>
        </small>
        <br />
        <br />
        no Task Found
      </div>
    );
  } else
    return (
      <div>
        <small>
          <u>This is initial</u>
        </small>
       <ul>
          {
            props.items.map((ele)=>
            <Useritem key = {ele._id} data={ele} cState = {stateChanege} />
            )
          }
        </ul>
      </div>
    );
}
export default Userlist;

import React from "react";
import Useritem from "./userItem";
import "./userItem.css";

function Userlist(props) {
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
            <Useritem key = {ele._id} data={ele} />
            )
          }
        </ul>
      </div>
    );
}
export default Userlist;

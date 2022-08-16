import React from "react";
import "./userItem.css";

function Userlist(props) {
  console.log(props.items.length);
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
  }
  return (
    <div>
      <small>
        <u>This is initial</u>
      </small>
      <br />
      <br />
      
    </div>
  );
}
export default Userlist;

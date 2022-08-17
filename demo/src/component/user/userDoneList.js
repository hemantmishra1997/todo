import React from "react";
import "./userDoneList.css";
import Userdoneitems from "./userDoneItems";

function Userdonelist(props) {
  if (props.doneItems.length === 0) {
    return (
      <div>
        <small>
          <u>This is Done Task</u>
        </small>
        <br />
        <br />
        no Task Found
      </div>
    );
  }
  else
  {
    return (
        <div>
          <small>
            <u>This is Done TASK</u>
          </small>
         <ul>
            {
              props.doneItems.map((ele)=>
              <Userdoneitems key = {ele._id} data={ele} />
              )
            }
          </ul>
        </div>
      );
  }
}
export default Userdonelist;

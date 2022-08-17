import React from "react";
import "./userRunningList.css";

function Userrunninglist(props){
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
}
export default Userrunninglist
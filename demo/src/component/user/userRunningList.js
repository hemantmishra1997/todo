import React from "react";
import "./userRunningList.css";
import Userrunningitem from "./userRunningItem";

function Userrunninglist(props){
    if (props.runningItems.length === 0) {
        return (
          <div>
            <small>
              <u>This is Running State</u>
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
                <u>This is Running State</u>
              </small>
             <ul>
                {
                  props.runningItems.map((ele)=>
                  <Userrunningitem key = {ele._id} data={ele} />
                  )
                }
              </ul>
            </div>
          );
      }
}
export default Userrunninglist
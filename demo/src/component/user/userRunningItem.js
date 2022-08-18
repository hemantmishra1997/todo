import React from "react";
import "./userRunningItem.css";

function Userrunningitem(props){
    function stateChange(id,state){
        props.cState(id,state)
    }
    return(
        <div>
            <li>
                <h3>
                {props.data.task}&#160;&#160;
                <button onClick={()=>{stateChange(props.data._id,"Initial")}}>Initial</button>&#160;&#160;
                <button onClick={()=>{stateChange(props.data._id,"done")}}>done</button></h3>
            </li>
        </div>
    )
}
export default Userrunningitem
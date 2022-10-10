import React from "react";
import "./userDoneItems.css";

function Userdoneitems (props){
    function stateChange(id,state){
        props.cState(id,state)
    }
    return(
        <div>
            <li>
                    <h3>
                    {props.data.task}&#160;&#160;
                    <button onClick={()=>{stateChange(props.data.id,"running")}}>Running</button>&#160;&#160;
                    <button onClick={()=>{stateChange(props.data.id,"Initial")}}>Initial</button></h3>
            </li>
        </div>
    )
}
export default Userdoneitems
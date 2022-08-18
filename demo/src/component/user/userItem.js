import React from "react";
import "./userItem.css";

function Useritem (props)
{
    const stateChange = (id,state)=>{
        props.cState(id,state)
    }
console.log("aa gya");
    return(
        <div>
            <li>
                <h3>
                    
                  {/* {(props.data)?props.data.task:<small>"loder..."</small>} */}
                    {props.data.task}&#160;&#160;
                    <button onClick={()=>{stateChange(props.data._id, "running")}}>Running</button>&#160;&#160;
                    <button onClick={()=>{stateChange(props.data._id, "done")}}>done</button>
                    </h3>
            </li>
        </div>
    )
}
export default Useritem
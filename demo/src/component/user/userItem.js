import React from "react";
import "./userItem.css";

function Useritem (props)
{
    return(
        <div>
            <li>
                    <h3>
                    {props.data.task}&#160;&#160;
                    <button>Running</button>&#160;&#160;
                    <button>done</button></h3>
            </li>
        </div>
    )
}
export default Useritem
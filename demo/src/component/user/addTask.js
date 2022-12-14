import React, { useState } from "react";
import "./addTask.css";
import axios from "axios";

function Addtask(props) {
  const [addTask, setAddTask] = useState({
    task: "",
    date: "",
    end_date : ""
  });
  const [output, setOutput] = useState("");
  
  //submit Handler
  const addDataHandler = (e) => {
    e.preventDefault();
    props.onAdd(addTask)
    setTimeout(() => {
      setAddTask("")
    }, 1000);
  };
  return (
    <div form-div>
      <small>{props.oput}</small>
      <form>
        <table>
          <tr>
            <th>Add Task</th>
            <td>
              <input
                type="text"
                onChange={(e) =>
                  setAddTask({ ...addTask, task: e.target.value })
                }
                value={addTask.task}
                placeholder="enter task"
              />
            </td>
          </tr>
          <tr>
            <th>Reminder</th>
            <td>
              <input
                type="date"
                value={addTask.date}
                onChange={(e) =>
                  setAddTask({ ...addTask, date: e.target.value })
                }
              />
            </td>
          </tr>

          <tr>
            <th>task end date</th>
            <td>
              <input
                type="date"
                value={addTask.end_date}
                onChange={(e) =>
                  setAddTask({ ...addTask, end_date: e.target.value })
                }
              />
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <center>
                <button type="button" onClick={addDataHandler}>
                  Add Task
                </button>
              </center>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}
export default Addtask;

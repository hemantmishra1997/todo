import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [registerDetals, setRegisterDetails] = useState({
    uname: "",
    email: "",
    password: "",
  });
  const [output, setOutput] = useState("");

  const urlApi = "http://localhost:3010/webapi/userRegister";

  //register Handler
  const registerHandler = (e) => {
    e.preventDefault();
    axios
      .post(urlApi, registerDetals)
      .then((result) => {
        setOutput(result.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="reg-div">
      <center>
        <h3>
          <u>Register New User</u>
        </h3>
        <small>{output}</small>
        <form>
          <table>
            <tr>
              <th>Name</th>
              <td>
                <input
                  type="text"
                  onChange={(e) => {
                    setRegisterDetails({
                      ...registerDetals,
                      uname: e.target.value,
                    });
                  }}
                  value={registerDetals.uname}
                  placeholder="Enter Name"
                />
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <input
                  type="email"
                  onChange={(e) => {
                    setRegisterDetails({
                      ...registerDetals,
                      email: e.target.value,
                    });
                  }}
                  value={registerDetals.email}
                  placeholder="Enter Email"
                />
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <input
                  type="password"
                  onChange={(e) => {
                    setRegisterDetails({
                      ...registerDetals,
                      password: e.target.value,
                    });
                  }}
                  value={registerDetals.password}
                  placeholder="Enter Password"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <center>
                  <button onClick={registerHandler}>Register</button>
                </center>
              </td>
            </tr>
          </table>
        </form>
        <Link to="../login">
          {" "}
          <button type="button">Login</button>{" "}
        </Link>
      </center>
    </div>
  );
}
export default Register;

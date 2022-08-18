import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [output, setOutout] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const apiUrl = "http://localhost:3010/webapi/loginuser";

  //submit event
  function submitHandler(e) {
    e.preventDefault();
    axios
      .post(apiUrl, loginDetails)
      .then((result) => {
        if (result.status === 200) {
          localStorage.setItem("id", result.data.response._id);
          localStorage.setItem("name", result.data.response.uname);
          localStorage.setItem("email", result.data.response.email);
          localStorage.setItem("role", result.data.response.role);
          localStorage.setItem("date", result.data.response.info);
          localStorage.setItem("token", result.data.token);
          setLoginDetails({});
          if (result.data.response.role === "admin") {
            navigate("/admin");
          } else navigate("/user");
        } else {
          setOutout(result.data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="login-div">
      <center>
        <h3>
          <u>Login User</u>
        </h3>
        <small>{output}</small>
        <form>
          <table>
            <tr>
              <th>Email</th>
              <td>
                <input
                  type="text"
                  onChange={(e) =>
                    setLoginDetails({ ...loginDetails, email: e.target.value })
                  }
                  value={loginDetails.email}
                  placeholder="email"
                />
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <input
                  type="password"
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    })
                  }
                  value={loginDetails.password}
                  placeholder="password"
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2}>
                <center>
                  <button onClick={submitHandler}>login</button>
                </center>
              </th>
            </tr>
          </table>
        </form>
        <span>User is new , register here</span>
        <br />
        <Link to="../register">
          {" "}
          <button type="button">Register</button>{" "}
        </Link>
      </center>
    </div>
  );
}
export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { app } from "../../firebase";
import Facebook from "../facebook/facebook";
import FacebookLogin from "react-facebook-login";
// import {getDatabase , ref, set} from "firebase/database"
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { async } from "@firebase/util";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// const db = getDatabase(app)

function Login() {
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("hello" + user);
  //     } else console.log("user is sign out");
  //   });
  // });
  // const signUpUser = () => {
  //   createUserWithEmailAndPassword(auth, "h@gmail.com", "hemant@123").then(
  //     (result) => {
  //       console.log(result);
  //     }
  //   );
  // };

  const navigate = useNavigate();
  const [output, setOutout] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  var signInWIthGoogle = async () => {
    try {
      let googleUserData = {};
      const data = await signInWithPopup(auth, googleProvider);
      console.log(data, "xxxxxxxxxxxxxxx");
      googleUserData = {
        userEmail: data._tokenResponse.email,
        providerId: data._tokenResponse.localId,
        provider: data.providerId,
        firstName: data._tokenResponse.firstName,
        lastName: data._tokenResponse.lastName,
      };
      const result = await axios.post("webapi/googlelogin", googleUserData);
      console.log(result, "zzzzzzzzzzzzzz");
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
        } else {
          navigate("/user");
        }
      } else {
        setOutout(result.data.token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   .then((result) => {

  //     axios
  //       .post("webapi/googlelogin", googleUserData)
  //       .then((result) => {
  //         console.log(result);
  //         if (result.status === 200) {
  //           localStorage.setItem("id", result.data.response._id);
  //           localStorage.setItem("name", result.data.response.uname);
  //           localStorage.setItem("email", result.data.response.email);
  //           localStorage.setItem("role", result.data.response.role);
  //           localStorage.setItem("date", result.data.response.info);
  //           localStorage.setItem("token", result.data.token);
  //           setLoginDetails({});
  //           if (result.data.response.role === "admin") {
  //             navigate("/admin");
  //           } else navigate("/user");
  //         } else {
  //           setOutout(result.data.token);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // };

  // var signInWIthGoogle = async () => {
  //   let googleUserData = {};
  //   const result = await signInWithPopup(auth, googleProvider).then((result) => {
  //     googleUserData = {
  //       userEmail: result._tokenResponse.email,
  //       providerId: result._tokenResponse.localId,
  //       provider: result.providerId,
  //       firstName: result._tokenResponse.firstName,
  //       lastName: result._tokenResponse.lastName,
  //     };
  //     axios
  //       .post("webapi/googlelogin", googleUserData)
  //       .then((result) => {
  //         console.log(result);
  //         if (result.status === 200) {
  //           localStorage.setItem("id", result.data.response._id);
  //           localStorage.setItem("name", result.data.response.uname);
  //           localStorage.setItem("email", result.data.response.email);
  //           localStorage.setItem("role", result.data.response.role);
  //           localStorage.setItem("date", result.data.response.info);
  //           localStorage.setItem("token", result.data.token);
  //           setLoginDetails({});
  //           if (result.data.response.role === "admin") {
  //             navigate("/admin");
  //           } else navigate("/user");
  //         } else {
  //           setOutout(result.data.token);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // };

  // console.log(userData);

  const googleapi = "http://localhost:3010/fauth/auth/facebook";
  const apiUrl = "http://localhost:3010/webapi/loginuser";

  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
  headers.append("Access-Control-Allow-Credentials", "true");

  headers.append("GET", "POST", "OPTIONS");

  const facebookAuth = ()=>{
  window.open("http://localhost:3010/fauth/auth/facebook","_self")
  }

  // const googleAuth = ()=>{
  //   window.open("http://localhost:3010/fauth/google","_self")
  //   }

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
      {/* <button onClick={signUpUser}>click</button> */}
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
        <br />
        {/* <a href="http://localhost:3010/auth/google"> login with google</a> */}
        <button onClick={signInWIthGoogle}>sign in with google</button>
        <br />
        {/* <a 
          onclick={() => onItemClick(item)}
          href={"http://localhost:3010/fauth/auth/facebook"}
        >Facebook Login</a> */}
        <br />
        <br />
        <Facebook />
        <br />
        <br />
        {/* <button onClick={googleAuth}>login with google</button>] */}

        {/* <button onClick={facebookAuth}>login with facebook</button>] */}
        
        {/* <a href="http://localhost:3010/auth/facebook">Facebook Login</a> */}
        <br />
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

import React ,{useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const componentClicked = (response)=>{
    console.log();
}
function Facebook(){
    const navigate = useNavigate();
    const [output, setOutout] = useState("");
     const responseFacebook = async(data) => {
       console.log(data.accessToken);
      let url = "http://localhost:3010/auth/facebook"
      let token = {"access_token":data.accessToken}
        try {
              const result = await 
              axios.post(url,token)
              console.log(result,"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
              if (result.status === 200){
              localStorage.setItem("id", result.data.response.id);
              localStorage.setItem("name", result.data.response.uname);
              localStorage.setItem("email", result.data.response.email);
              localStorage.setItem("provider",result.data.response.provider)
              localStorage.setItem("role", result.data.response.role);
              localStorage.setItem("date", result.data.response.info);
              localStorage.setItem("token", result.data.token);
              setOutout("");
              }
              if (result.data.response.role === "admin") {
                navigate("/admin");
              }
              else
              {
                navigate("/user");
              }
          } catch (err) {
            console.log(err);
          }
      }
    
     const onSuccess = (es)=>{
       console.log(es);
     }

     const onFailure = (es)=>{
      console.log(es);
    }

    return(
  <FacebookLogin
    appId="674107167040712"
    autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} />
 
    )
}
export default Facebook
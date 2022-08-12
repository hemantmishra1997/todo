import React ,{useState} from 'react';
import { BrowserRouter ,Routes, Route, } from 'react-router-dom';
import Header from './component/header/header';
import Mainnavigation from './component/nav-bar/mainnavigation';
import Login from './component/login/login';
import Register from './component/register/register';

function App() {

  // const [todoLsit , setTodoList] = useState([{"task":"my first task"}])
  // function newToDo(data){
  //   console.log(data);
  //   setTodoList((ptl)=>ptl.concat(data))
  // }

  return (
    <div className="app">
     <Header/> 
   
      <Mainnavigation />
      <br/>
      <br/> 
       <Routes>
       <Route path = "/login" element={<Login/>}></Route> 
       <Route path = "/" element={<Login/>}></Route>  
       <Route path = "/register" element={<Register/>}></Route> 
      {/* <Route path = "/login" element={<Login/>}></Route> 
      <Route path = "/usertask" element={<Usertask/>}></Route> 
      <Route path = "/addtodo" element={<AddToDo addNewToDo={newToDo}/>}></Route> */}

     </Routes>  
   
    </div>
  );
}

export default App;

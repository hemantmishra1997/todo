import {initializeApp} from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyBjSww_cnu2onZACh-sHErtPnDDIIyYueU",
    authDomain: "todo-application-ab3a4.firebaseapp.com",
    projectId: "todo-application-ab3a4",
    storageBucket: "todo-application-ab3a4.appspot.com",
    messagingSenderId: "261270651227",
    appId: "1:261270651227:web:6375ee0ef6fd5b14791a7e",
    measurementId: "G-NL0GGQ34PL",
    databaseURL:"https://todo-application-ab3a4-default-rtdb.firebaseio.com"
  };
  export const app = initializeApp(firebaseConfig)
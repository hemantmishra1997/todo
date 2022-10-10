// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken ,onMessage} from "firebase/messaging";


// const firebaseConfig = {
//   apiKey: "AIzaSyCvGvQScHy8dLjVmx16lVXMv-AJqFcoVK0",
//   authDomain: "react-app-165f4.firebaseapp.com",
//   projectId: "react-app-165f4",
//   storageBucket: "react-app-165f4.appspot.com",
//   messagingSenderId: "990828751168",
//   appId: "1:990828751168:web:fdc730c7c9bc3c9c2eb2a5",
//   measurementId: "G-PBBH4BNW4S"
// };
// const app = initializeApp(firebaseConfig);

// const messaging = getMessaging(app);

// export const fetchToken = ( setTokenFound , setFcmToken)=>{
//   return getToken(messaging ,
//     {vapidKey:"BLW86z2q07NVhtSgVIPAVQSsW1EsBIfyqDoqifgWZeG_9OL-dZg06KpLZdcJy0iZBfF5c3Q2G2o3LWYNz83Ofm0"})
//     .then((currentToken)=>{
//        if(currentToken){
//         setTokenFound(true);
//         setFcmToken(currentToken)
//         console.log(currentToken);
//        }
//        else{
//          console.log("no token found");
//          setTokenFound(false);
//          setFcmToken("")
//        }
//     }).catch((err)=>{
//         console.log("err occured",err);
//     })
// }

// export const onMessageListener = () =>{
//   return new Promise((resolve)=>{
//     onMessage(messaging,(payload)=>{
//       console.log(payload);
//       resolve(payload)
//     });
   
//   })
// }

// // function requestPermission() {
// //   console.log("Requesting permission...");
// //   Notification.requestPermission().then((permission) => {
// //     if (permission === "granted") {
// //       console.log("Notification permission granted.");
// //       const app = initializeApp(firebaseConfig);

// //       const messaging = getMessaging(app);
// //       getToken(messaging, {
// //         vapidKey:
// //           "BLW86z2q07NVhtSgVIPAVQSsW1EsBIfyqDoqifgWZeG_9OL-dZg06KpLZdcJy0iZBfF5c3Q2G2o3LWYNz83Ofm0"})
// //           .then((currentToken) => {
// //         if (currentToken) {
// //           console.log("currentToken :", currentToken);
// //         } else {
// //           console.log("can not get token");
// //         }
// //       });
// //     } else {
// //       console.log("do not have permission");
// //     }
    
// //   });
// // }

// // requestPermission();
// // export const onMessageListener = ()=>
// //   new Promise((resolve)=>{
// //     messaging.onMessage((payload)=>{
// //       resolve(payload)
// //     })
// //   })

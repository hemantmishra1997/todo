// // import firebase from "../../server/config/firebase";

// importScripts('https://www.gstatic.com/firebase/9.2.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebase/9.2.0/firebase-messaging-compat.js');


// firebase.initializeApp({
//   apiKey: "AIzaSyCvGvQScHy8dLjVmx16lVXMv-AJqFcoVK0",
//   authDomain: "react-app-165f4.firebaseapp.com",
//   projectId: "react-app-165f4",
//   storageBucket: "react-app-165f4.appspot.com",
//   messagingSenderId: "990828751168",
//   appId: "1:990828751168:web:fdc730c7c9bc3c9c2eb2a5",
//   measurementId: "G-PBBH4BNW4S"
// })


// const messaging = firebase.messaging()
// messaging.onBackgroundMessage((payload)=>{
//   console.log("recive Background message",payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions={
//     body:payload.notification.body,
//   };
//   return self.ServiceWorkerRegistration.showNotification(notificationTitle,notificationOptions)
// })
  
// // addEventListener('error', (event) => { });

// // onerror = (event) => { };



// // firebase.messaging();

// //  if ('serviceWorker' in navigator) {
// //      navigator.serviceWorker.register('../firebase-messaging-sw.js')
// //        .then(function(registration) {
// //          console.log('Registration successful, scope is:', registration.scope);
// //        }).catch(function(err) {
// //         console.log('Service worker registration failed, error:', err);
// //        });
// //     }



// //  firebase.initializeApp({
// //     messagingSenderId: "990828751168",
// //    })

   

// // const initMessaging = firebase.messaging()


// // import { getMessaging } from "firebase/messaging";
// // import { onBackgroundMessage } from "firebase/messaging/sw";

// // const messaging = getMessaging();
// // onBackgroundMessage(messaging, (payload) => {
// //   console.log('[firebase-messaging-sw.js] Received background message ', payload);

// //   const notificationTitle = 'Background Message Title';
// //   const notificationOptions = {
// //     body: 'Background Message body.',
// //     icon: '/firebase-logo.png'
// //   };

// //   self.registration.showNotification(notificationTitle,
// //     notificationOptions);
// // });
//=============================================================================================
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBjSww_cnu2onZACh-sHErtPnDDIIyYueU",
//   authDomain: "todo-application-ab3a4.firebaseapp.com",
//   projectId: "todo-application-ab3a4",
//   storageBucket: "todo-application-ab3a4.appspot.com",
//   messagingSenderId: "261270651227",
//   appId: "1:261270651227:web:6375ee0ef6fd5b14791a7e",
//   measurementId: "G-NL0GGQ34PL"
// };

// // Initialize Firebase 
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
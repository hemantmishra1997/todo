import firebase from "../../server/config/firebase";

importScripts('https://www.gstatic.com/firebase/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebase/9.2.0/firebase-messaging-compat.js');


firebase.initializeApp({
  apiKey: "AIzaSyCvGvQScHy8dLjVmx16lVXMv-AJqFcoVK0",
  authDomain: "react-app-165f4.firebaseapp.com",
  projectId: "react-app-165f4",
  storageBucket: "react-app-165f4.appspot.com",
  messagingSenderId: "990828751168",
  appId: "1:990828751168:web:fdc730c7c9bc3c9c2eb2a5",
  measurementId: "G-PBBH4BNW4S"
})


const messaging = firebase.messaging()
messaging.onBackgroundMessage((payload)=>{
  console.log("recive Background message",payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions={
    body:payload.notification.body,
  };
  return self.ServiceWorkerRegistration.showNotification(notificationTitle,notificationOptions)
})
  
addEventListener('error', (event) => { });

onerror = (event) => { };



// firebase.messaging();

//  if ('serviceWorker' in navigator) {
//      navigator.serviceWorker.register('../firebase-messaging-sw.js')
//        .then(function(registration) {
//          console.log('Registration successful, scope is:', registration.scope);
//        }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//        });
//     }



//  firebase.initializeApp({
//     messagingSenderId: "990828751168",
//    })

   

// const initMessaging = firebase.messaging()


// import { getMessaging } from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";

// const messaging = getMessaging();
// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);

//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

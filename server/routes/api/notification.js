//import { initializeApp } from 'firebase-admin/app'

import admin from "firebase-admin";
import serviceAccount from "../../config/firebase.js";

export function init() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  sendPushNotification(message);
}

const message = {
  token:
    "dTnrUHrebvTUmntMTOM86V:APA91bF6YjVyQMdTqEmnE21GwOZ9Bf0__n26kvFeaDxPm1HStY-PpqqqX_6937ivo0mzuj_s5wvYIkchspVrdb0LhbBNQxISOIcwEcNh33D0DspSlJ3V1QV5jggXndg5K-qS322VXDx8",
  webpush: {
    notification: {
      title: "New Content!",
      body: "abhi mza aayga na bidu",
      icon: "your_icon",
    },
  },
};
const sendPushNotification = () => {
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("sucessfully send message", response);
    })
    .catch((error) => {
      console.log("error send message", error);
    });
};


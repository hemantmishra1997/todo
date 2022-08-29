import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import cron from "node-cron";
import { Server } from "socket.io";
import addTaskController from "./controller/addTaskController.js";
import {init} from "./routes/api/notification.js"

//server created
const app = express();
const server = http.createServer(app);
init()

// //socket built
// const io = new Server(server, { cors: { origin: "*" } });

// //socket connection
// io.on("connection", async (socket) => {
//   console.log("connection build", socket.id);

//   socket.on("disconnect", async () => {
//     console.log("Disconnected");
//   });
//   var a = await rem();
//   console.log(a);
//   socket.emit("hello", a, (response) => {
//     console.log(response); // "got it"
//   });
// });

//route
import mainRoute from "./routes/route.js";

//middlware
app.use(cors());
app.use(bodyParser.json());
app.use("/webapi", mainRoute);
app.set("port", 3010);

server.listen(app.get("port"), function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

// //reminder logic
// const rem = async () => {
//   return await new Promise((resolve, reject) => {
//     console.log("1");
//     cron.schedule("*/30 * * * * *", () => {

//       var today = new Date();
//       var m = today.getMonth() + 1;
//       var month = m >= 1 && m <= 9 ? "0" + m : m;
//       var current_date =today.getFullYear() + "-" + month + "-" + today.getDate();
//       console.log(current_date)
//       addTaskController
//         .featchTask({ time: current_date })
//         .then((result) => {
//           resolve(result);
//         });
//     });
//   });
// };

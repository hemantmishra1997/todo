import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cron from "node-cron";
import addTaskController from "./controller/addTaskController.js";



const app = express();

app.listen(3010);
console.log("http://localhost:3010");

//route
import mainRoute from "./routes/route.js";

//middlware
app.use(cors());
app.use(bodyParser.json());

// //cron schdular
// console.log("schedular");
// cron.schedule("*/60 * * * * *", () => {
//   addTaskController
//     .featchTask({ state: "Initial" })
//     .then((result) => {
//       var d = new Date();
//       var dh = d.getHours() - 1; // => 9
//       var dm = d.getMinutes() - 1; // =>  30
//       var timeNow = dh + ":" + dm;
//       for (let i of result) {
//         //console.log(i.time,timeNow);
//         if (i.time == timeNow) {
//           addTaskController
//             .featchTask({ time: i.time })
//             .then((result) => {
//               console.log(result);
//             })
//             .catch((err) => {
//               console.log(err, "schedular");
//             });
//         } else continue;
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//reminder()

app.use("/webapi", mainRoute);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addTaskController_1 = __importDefault(require("../controller/addTaskController"));
//import { decode } from "punycode";
const bcrypt_1 = __importDefault(require("bcrypt"));
//import cron from "node-cron";
const mainRoute = express_1.default.Router();
var token = "";
// ------------------------------------------start middleware------------------------------------------
//------------------------------------------token verify middle ware------------------------------------------
// const varifyToken = (req: express.Request, res: Response, _next: NextFunction) => {
//   token = req.headers["authorization"];
//   if (token) {
//     token = token.split(" ")[1];
//     jwt.verify(token, "my first project", (err, result) => {
//       if (err) {
//        res.status(201)
//           .json({ response: "token is not provided / unauthorized user" });
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.send({ response: "send token with header" });
//   }
// };
// //------------------------------------------error middleware------------------------------------------------
// // mainRoute.use((err,res,next)=>{
// //     res.status(500)
// //     res.send({"error":"oops something went wrong    "})
// // })
// // ------------------------------------------end middleware------------------------------------------
// //------------------------------------------Routes------------------------------------------
// //------------------------------------------ADD TASK ROUTE------------------------------------------
// mainRoute.post("/addTask",this.varifyToken, (req, res) => {
//   var data = {}; //blank object
//   if (!req.body.task) {
//     return res.status(201).json({ response: "task is missing" });
//   }
//   if (!req.body.time) {
//     return res.status(201).json({ response: "time is missing" });
//   }
//   data.task = req.body.task;
//   data.time = req.body.time;
//   const decoded = jwt.verify(token, "my first project");
//   data = { ...data, userId: decoded.subject };
//   addTaskController
//     .addTaskUser(data)
//     .then((result) => {
//       res.status(200).json({ response: "data save successfully" });
//       //reminder()
//     })
//     .catch((err) => {
//       res.status(200).json({ response: err });
//     });
// });
// //------------------------------------------get inital task list------------------------------------------
// mainRoute.get("/fetchTask", varifyToken, (req, res) => {
//   const decoded = jwt.verify(token, "my first project");
//   var a = url.parse(req.url, true).query;
//   let data = { ...a, userId: decoded.subject };
//   addTaskController
//     .featchTask(data)
//     .then((result) => {
//       res.status(200).json({ response: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// mainRoute.put("/:id", varifyToken, (req, res) => {
//   const id = req.params.id;
//   addTaskController
//     .updateTask(id, req.body)
//     .then((result) => {
//       res.status(200).json({ response: "data update sucessfully" });
//     })
//     .catch((err) => {
//       res.status(201).json({ response: "data not update" });
//     });
// });
// mainRoute.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   addTaskController
//     .deleteTask(id)
//     .then((result) => {
//       res.status(200).json({
//         result: result,
//       });
//     })
//     .catch((err) => {
//       res.status(201).json({
//         err: err,
//       });
//     });
// });
mainRoute.post("/userRegister", (req, res) => {
    console.log(req.body);
    // ------------------------------------------empty object------------------------------------------
    if (!req.body.uname) {
        return res.status(201).json({ response: "name is missing" });
    }
    if (!req.body.email) {
        return res.status(201).json({ response: "email is missing" });
    }
    if (!req.body.password) {
        return res.status(201).json({ response: "password is missing" });
    }
    if (!req.body.firstName) {
        return res.status(201).json({ response: "firstName is missing" });
    }
    if (!req.body.lastName) {
        return res.status(201).json({ response: "lastName is missing" });
    }
    if (!req.body.gander) {
        return res.status(201).json({ response: "gander is missing" });
    }
    let data = {};
    data.uname = req.body.uname;
    data.email = req.body.email;
    data.firstName = req.body.firstName;
    data.lastName = req.body.lastName;
    data.gander = req.body.gander;
    //------------------------------------------pasword encored------------------------------------------
    bcrypt_1.default.genSalt(10, function (err, salt) {
        bcrypt_1.default.hash(req.body.password, salt, function (err, hash) {
            data.password = hash;
            addTaskController_1.default
                .registerUser(data)
                .then((result) => {
                res.status(200).json({ response: "data save successfully" });
            })
                .catch((err) => {
                console.log("error");
                res.json("error");
                // res.status(201).json({ response: err });
            });
        });
    });
});
// mainRoute.post("/loginuser", (req, res) => {
//   var data = {}; //blank object
//   //------------------------------------------validation------------------------------------------
//   if (!req.body.email) {
//     return res.status(201).json({ token: "email is missing" });
//   }
//   if (!req.body.password) {
//     return res.status(201).json({ token: "password is missing" });
//   }
//   data.email = req.body.email;
//   //------------------------------------------call to controller------------------------------------------
//   addTaskController
//     .loginUser(data)
//     .then((result) => {
//       //------------------------------------------result length check for error------------------------------------------
//       if (result.length != 0) {
//         //------------------------------------------password check------------------------------------------
//         bcrypt.compare(
//           req.body.password,
//           result[0].password,
//           function (err, output) {
//             if (output) {
//               var payloader = { subject: result[0].email };
//               var token = jwt.sign(payloader, "my first project", {
//                 expiresIn: "4h",
//               });
//               res.status(200).json({ token: token, response: result[0] });
//             } else {
//               res.status(201).json({ token: "password is incorrect" });
//             }
//           }
//         );
//       } else res.status(201).json({ token: "username is incorrect" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(201).json({ token: "error" });
//     });
// });
//reminder
// mainRoute.get("/reminder", (req, res) => {
//   console.log("scheduar");
// var d = new Date();
//       var dh = d.getHours();
//       var dm = d.getMinutes();
//       if (dh >= 1 && dh <= 9) {
//         var dhh = "0" + dh;
//       } else {
//         dhh = dh;
//       }
//       if (dm >= 1 && dm <= 9) {
//         var dmm = "0" + dm;
//       } else {
//         dmm = dm;
//       }
//       var timeNow = dhh + ":" + dmm;
//       //let timeNowString = String(timeNow)
//    console.log("1",timeNow);
//       console.log(typeof timeNow);
//       cron.schedule("*/30 * * * * *", () => {
//    console.log("2",timeNow);
//   addTaskController
//     .featchTask({ time: timeNow })
//     .then((result) => {
//       console.log(result);
// for (let i of result) {
//   console.log(i.time, timeNow);
//   if (i.time == timeNow) {
//     console.log(i.time);
//   }
// }
// for (let i of result) {
//   console.log(i.time, timeNow);
// if (i.time == timeNow) {
//   addTaskController.featchTask({ time: i.time }).then((result) => {
//   console.log(result);
//   // return (result[0]);
//   }).catch((err) => {
//   console.log("schedular", err);
//     });
//   }
// }
// mainRoute.get("*", (req, res) => {
// console.log("errroute");
//   res.status(500);
//   res.json({ error: "oops something went wrong " });
// });
// export function reminder(){
//     //cron schdular
//     console.log("schedular");
//     cron.schedule("*/3 * * * * *", () => {
//       addTaskController
//         .featchTask({ state: "Initial" })
//         .then((result) => {
//           var dhh
//           var d = new Date();
//           var dh = d.getHours() ; // => 9
//           var dm = d.getMinutes(); // =>  30
//           (dh>=1&&dh<=9)? dhh = "0"+dh: dhh = dh
//           var timeNow = dhh + ":" + dm;
//           for (let i of result) {
//             console.log(i.time,timeNow);
//             if (i.time == timeNow) {
//               addTaskController
//                 .featchTask({ time: i.time })
//                 .then((result) => {
//                 })
//                 .catch((err) => {
//                   console.log(err, "schedular");
//                 });
//               } else continue;
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//         });
//       }
exports.default = mainRoute;

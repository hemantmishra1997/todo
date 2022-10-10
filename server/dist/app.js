"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
// import {init} from "./routes/api/notification.js"
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
//middlware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// app.set("port", 3010);
//  app.use("/webapi", mainRoute);
app.post("/register", (req, res) => {
    console.log(req.body, "hascs data");
});
app.listen(3015);
console.log("server connec port " + 3015);
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

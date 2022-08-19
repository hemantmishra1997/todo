import express from "express";
import addTaskController from "../controller/addTaskController.js";
import * as url from "url";
import jwt from "jsonwebtoken";
import cron from "node-cron";
//import { decode } from "punycode";
import bcrypt, { genSalt } from "bcrypt";
//import { appendFile } from "fs";
// import * as cronn from "./routes/shadular.js"


const mainRoute = express.Router();
var token = "";
// ------------------------------------------start middleware------------------------------------------
//------------------------------------------token verify middle ware------------------------------------------
const varifyToken = (req, res, next) => {
  token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, "my first project", (err, result) => {
      if (err) {
        res
          .status(201)
          .json({ response: "token is not provided / unauthorized user" });
      } else {
        next();
      }
    });
  } else {
    res.send({ response: "send token with header" });
  }
};

//------------------------------------------error middleware------------------------------------------------
// mainRoute.use((err,res,next)=>{
//     res.status(500)
//     res.send({"error":"oops something went wrong    "})
// })
// ------------------------------------------end middleware------------------------------------------

//------------------------------------------Routes------------------------------------------

//------------------------------------------ADD TASK ROUTE------------------------------------------
mainRoute.post("/addTask", varifyToken, (req, res) => {
  var data = {}; //blank object
  if (!req.body.task) {
    return res.status(201).json({ response: "task is missing" });
  }
  if (!req.body.time) {
    return res.status(201).json({ response: "time is missing" });
  }
  data.task = req.body.task;
  data.time = req.body.time;
  const decoded = jwt.verify(token, "my first project");
  data = { ...data, userId: decoded.subject };
  addTaskController
    .addTaskUser(data)
    .then((result) => {
        res.status(200).json({ response: "data save successfully" });
        reminder()
     })
    .catch((err) => {
      res.status(200).json({ response: err });
    });
});

//------------------------------------------get inital task list------------------------------------------
mainRoute.get("/fetchTask", varifyToken, (req, res) => {
  const decoded = jwt.verify(token, "my first project");
  var a = url.parse(req.url, true).query;
  let data = { ...a, userId: decoded.subject };
  addTaskController
    .featchTask(data)
    .then((result) => {
      res.status(200).json({ response: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

mainRoute.put("/:id", varifyToken, (req, res) => {
  const id = req.params.id;
  addTaskController
    .updateTask(id, req.body)
    .then((result) => {
      res.status(200).json({ response: "data update sucessfully" });
    })
    .catch((err) => {
      res.status(201).json({ response: "data not update" });
    });
});

mainRoute.delete("/:id", (req, res) => {
  const id = req.params.id;
  addTaskController
    .deleteTask(id)
    .then((result) => {
      res.status(200).json({
        result: result,
      });
    })
    .catch((err) => {
      res.status(201).json({
        err: err,
      });
    });
});

mainRoute.post("/userRegister", (req, res) => {
  // ------------------------------------------empty object------------------------------------------
  var data = {};
  if (!req.body.uname) {
    return res.status(201).json({ response: "name is missing" });
  }
  if (!req.body.email) {
    return res.status(201).json({ response: "email is missing" });
  }
  if (!req.body.password) {
    return res.status(201).json({ response: "password is missing" });
  }
  data.uname = req.body.uname;
  data.email = req.body.email;
  //------------------------------------------pasword encored------------------------------------------
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      data.password = hash;
      addTaskController
        .registerUser(data)
        .then((result) => {
          res.status(200).json({ response: "data save successfully" });
        })
        .catch((err) => {
          res.status(201).json({ response: err });
        });
    });
  });
});

mainRoute.post("/loginuser", (req, res) => {
  var data = {}; //blank object
  //------------------------------------------validation------------------------------------------
  if (!req.body.email) {
    return res.status(201).json({ token: "email is missing" });
  }
  if (!req.body.password) {
    return res.status(201).json({ token: "password is missing" });
  }
  data.email = req.body.email;
  //------------------------------------------call to controller------------------------------------------
  addTaskController
    .loginUser(data)
    .then((result) => {
      //------------------------------------------result length check for error------------------------------------------
      if (result.length != 0) {
        //------------------------------------------password check------------------------------------------
        bcrypt.compare(
          req.body.password,
          result[0].password,
          function (err, output) {
            if (output) {
              var payloader = { subject: result[0].email };
              var token = jwt.sign(payloader, "my first project", {
                expiresIn: "4h",
              });
              res.status(200).json({ token: token, response: result[0] });
            } else {
              res.status(201).json({ token: "password is incorrect" });
            }
          }
        );
      } else res.status(201).json({ token: "username is incorrect" });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({ token: "error" });
    });
});

mainRoute.put("/", (req, res) => {
  res.json({ response: "hello" });
});

mainRoute.get("*", (req, res) => {
  res.status(500);
  res.json({ error: "oops something went wrong    " });
});

export default mainRoute;

function reminder(){
    //cron schdular
    console.log("schedular");
    cron.schedule("*/60 * * * * *", () => {
      addTaskController
        .featchTask({ state: "Initial" })
        .then((result) => {
          var d = new Date();
          var dh = d.getHours() - 1; // => 9
          var dm = d.getMinutes() - 1; // =>  30
          var timeNow = dh + ":" + dm;
          for (let i of result) {
            //console.log(i.time,timeNow);
            if (i.time == timeNow) {
              addTaskController
                .featchTask({ time: i.time })
                .then((result) => {
                 console.log(result);
                })
                .catch((err) => {
                  console.log(err, "schedular");
                });
            } else continue;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
}
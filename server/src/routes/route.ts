import express, { Request, Response, NextFunction } from "express";
import addTaskController from "../controller/addTaskController";
import * as url from "url";
import jwt from "jsonwebtoken";
//import { decode } from "punycode";
import bcrypt, { genSalt } from "bcrypt";
import Joi, { number, string } from "joi";
import jwt_decode from 'jwt-decode'
// import {JwtPayload} from "jwt-decode"

//import cron from "node-cron";

const mainRoute = express.Router();

var id: number

//=================================================================================================================
//                                express validater
//=================================================================================================================


// const validaoreMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   var a = 201
//   const schema = Joi.object().keys({
//     uname: Joi.string().required(),
//     // email :Joi.string().required(),
//     // password:Joi.string().required(),
//     // firstName : Joi.string().required(),
//     // lastName : Joi.string().required(),
//     // gender : Joi.string().required(),
//   }).unknown(true)
//   const error = schema.validate(req.body, { abortEarly: false })
//   if (error) {
//     const details = error
//     return res.status(a).json({ error: details })
//   }
//   else {
//     next()
//   }
// }


//==================================================================================================================
//                                 api for register user
//==================================================================================================================

mainRoute.post("/userRegister", async (req, res) => {



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
  if (!req.body.gender) {
    return res.status(201).json({ response: "gender is missing" });
  }
  // ------------------------------------------empty object------------------------------------------

  type Data = { uname: string, email: string, password: string, firstName: string, lastName: string, gender: string, photo: string }
  let data: Partial<Data> = {};
  data.uname = req.body.uname;
  data.email = req.body.email;
  data.firstName = req.body.firstName;
  data.lastName = req.body.lastName;
  data.gender = req.body.gender;

  //------------------------------------------pasword encored------------------------------------------
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      data.password = hash;
      try {
        var result = await addTaskController.registerUser(data)
        result?.response ? res.status(200).json({ "response": `${data.email} register sucessfully` }) : result?.error
        res.status(201).json({ "error": result?.error })
      } catch (err) {
        console.log(err);
      }
    });
  });
});

//==================================================================================================================
//                                 api for login user
//==================================================================================================================


mainRoute.post("/loginuser", async (req, res) => {
  var data = {}; //blank object
  //------------------------------------------validation------------------------------------------
  if (!req.body.email) {
    return res.status(201).json({ token: "email is missing" });
  }
  if (!req.body.password) {
    return res.status(201).json({ token: "password is missing" });
  }

  type Data = { email: string }
  let loginData: Partial<Data> = {};
  loginData.email = req.body.email;

  //------------------------------------------call to controller------------------------------------------

  var result = await addTaskController.loginUser(loginData)
  if (result?.response) {
    var size = Object.keys(result).length;
    if (size != 0) {
      //------------------------------------------password check------------------------------------------
      bcrypt.compare(req.body.password, result.response.password, function (err, output) {
        if (output) {
          var payloader = { subject: result?.response?.id };
          var token = jwt.sign(payloader, "my first project", {
            expiresIn: "4h",
          });
          res.status(200).json({ token: token, response: result?.response });
        } else {
          res.status(201).json({ token: "password is incorrect" });
        }
      }
      );
    }
  }
  else {
    res.status(201).json({ token: "not user" });
  }
})

//==================================================================================================================
//                                    token verify middle ware
//==================================================================================================================

const varifyToken = (req: express.Request, res: Response, _next: NextFunction) => {
  console.log("hA CHALA");
  
  var token: string = req.headers["authorization"] as string;

  if (token) {
    token = token.split(" ")[1];
    // var id = jwt.verify(token,"my first project")

    jwt.verify(token, "my first project", (err, result) => {
      if (err) {
        res.status(201).json({ response: "token is not provided / unauthorized user" });
      } else {
        let decoded: any = jwt_decode(token);
        id = decoded.subject
        _next();
      }
    });
  } else {
    res.send({ response: "send token with header" });
  }
};


//==================================================================================================================
//                                 api for Add Task
//==================================================================================================================


mainRoute.post("/addTask", varifyToken, async (req, res) => {

  // var data = {}; //blank object
  if (!req.body.task) {
    return res.status(201).json({ response: "task is missing" });
  }

  if (!req.body.date) {
    return res.status(201).json({ response: "date is missing" });
  }
  if (!req.body.end_date) {
    return res.status(201).json({ response: "end_date is missing" });
  }
  type Data = { task: string, time: string, date: string, end_date: string, userid: number }
  let addTaskData: Partial<Data> = {};
  // loginData.email = req.body.email;

  addTaskData.task = req.body.task;
  addTaskData.date = req.body.date;
  addTaskData.end_date = req.body.end_date;

  addTaskData = { ...addTaskData, "userid": id }

  var result = await addTaskController.addTaskUser(addTaskData)
  if (result?.response) {
    res.status(200).json({ response: " task add successfully" });
  }
  else {
    res.status(201).json({ response: result });
  }
});

//==================================================================================================================
//                                 api for fetch Task user
//==================================================================================================================


mainRoute.get("/fetchTask", varifyToken, async (req, res) => {

  var initialTask = url.parse(req.url, true).query;
  let data = { ...initialTask, userId: id };
  
  const result = await addTaskController.featchTask(data)
  if (result?.response?.length != 0) {
    //  console.log(result?.response,"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy" );

    res.status(200).json({ response: result?.response })
  }
  else {
    res.status(201).json({ error: "no data found" })
  }
});




//==================================================================================================================
//                                 api for change state
//==================================================================================================================


mainRoute.put("/:id", varifyToken, async (req, res) => {
  const id = req.params.id;
  console.log(req.body, id);
  const result = await addTaskController.updateTask(id, req.body)
  console.log(result);

  res.status(200).json({ response: "data update sucessfully" })
});



//==================================================================================================================
//                                 api for google login
//==================================================================================================================

mainRoute.post("/googlelogin", async (req, res) => {
  console.log(req.body);

  let data: any = {}
  data.email = req.body.userEmail
  data.providerId = req.body.providerId
  data.provider = req.body.provider
  console.log(data);

  var result = await addTaskController.loginUserGoogle(data)
  if (result?.response) {
    var size = Object.keys(result).length;
      if (size != 0) {
          var payloader = { subject: result?.response?.id };
          var token = jwt.sign(payloader, "my first project", {expiresIn: "4h",});
        
        
          return res.status(200).json({ token: token, response: result?.response });
      }
  }
  else {
    data.firstName = req.body.firstName
    data.lastName = req.body.lastName
    try {
      result = await addTaskController.registerUser(data)
      if (result?.response) {
        var payloader = { subject: result?.response?.id };
        var token = jwt.sign(payloader, "my first project", {
          expiresIn: "4h",
        });
        console.log(result?.response)
        
        res.status(200).json({ token: token, response: result?.response });
      }
      else {
        res.status(201).json({ "error": result?.error })
      }
    } catch (err) {
      console.log(err, "passport.ts file");
    }
  }
})


//==================================================================================================================
//                                 api for addTaskByFacebook
//==================================================================================================================

mainRoute.post("/addTaskByFacebook", async (req, res) => {
  console.log("adsdkm");
  
  // var data = {}; //blank object
  if (!req.body.task) {
    return res.status(201).json({ response: "task is missing" });
  }

  if (!req.body.date) {
    return res.status(201).json({ response: "date is missing" });
  }
  if (!req.body.end_date) {
    return res.status(201).json({ response: "end_date is missing" });
  }
  type Data = { task: string, time: string, date: string, end_date: string, userid: number }
  let addTaskData: Partial<Data> = {};
  // loginData.email = req.body.email;

  addTaskData.task = req.body.task;
  addTaskData.date = req.body.date;
  addTaskData.end_date = req.body.end_date;

  addTaskData = { ...addTaskData, "userid": id }

  var result = await addTaskController.addTaskUser(addTaskData)
  if (result?.response) {
    res.status(200).json({ response: " task add successfully" });
  }
  else {
    res.status(201).json({ response: result });
  }
});









// ------------------------------------------start middleware------------------------------------------
//------------------------------------------ token verify middleware ------------------------------------------
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
// mainRoute.use((err,res,next)=>{
//     res.status(500)
//     res.send({"error":"oops something went wrong"})
// })
// // ------------------------------------------end middleware-------------------------------------------------

// //------------------------------------------Routes----------------------------------------------------------

// //------------------------------------------ADD TASK ROUTE--------------------------------------------------
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

//------------------------------------------ get inital task list -----------------------------------------------
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


mainRoute.get("*", (req, res) => {
  console.log("errroute");

  res.status(500);
  res.json({ error: "oops something went wrong " });
});

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
export default mainRoute;

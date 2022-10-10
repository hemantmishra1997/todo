import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session"
import http from "http";
import passport from "passport";
// import {init} from "./routes/api/notification.js"
import cookieSession from "cookie-session";
import { Strategy as FacebookStrategy } from 'passport-facebook'
import config from "./key/facebookconfig"



const app = express();
const server = http.createServer(app);

passport.use(new FacebookStrategy({
  clientID: config.facebookAuth.clientID,
  clientSecret: config.facebookAuth.clientSecret,
  callbackURL: '/facebook/callback',
  profileFields: ['id', 'displayName', 'email', 'name', 'photos'],
  passReqToCallback: true,
},
function(accessToken, refreshToken, profile, cb) {
  // save the profile on the Database
  // Save the accessToken and refreshToken if you need to call facebook apis later on
  return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj:any, cb) {
  cb(null, obj);
});







app.use(cookieSession({
  name:"session",
  keys:["hemant"],
  maxAge:24*48*48*100

}))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
  }));

  app.use(passport.initialize());
  app.use(passport.session());


//middlware
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    // Access-Control-Allow-Origin : "http://localhost:3000" // allow session cookie from browser to pass through,

  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//route
import mainRoute from "./routes/route"
import oauthRoute from "./routes/oauthRoute"
import fackbookRoute from "./routes/facebookAuthRoute"

app.use("/webapi", mainRoute);
app.use("/",oauthRoute)
app.use("/auth",fackbookRoute)

app.listen(3010)
console.log("server connec port "+3010);

// //reminder logic
//sum of two number in c?
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
            //push notification
            
            // {
            //   init()
            // }
            
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
            
            
            

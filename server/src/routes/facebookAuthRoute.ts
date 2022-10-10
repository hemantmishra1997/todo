import { Strategy as FacebookStrategy } from 'passport-facebook'
import passport from "passport";
import express from "express"
// import "../passport/facebookPAssport"
import session from "express-session"
import FacebookTokenStrategy from 'passport-facebook-token'
// import "../passport/passport"
import addTaskController from '../controller/addTaskController';
import facebookconfig from '../key/facebookconfig';
import jwt from 'jsonwebtoken';
import { any } from 'joi';
import { isRedirect } from 'node-fetch';
import config from '../key/facebookconfig';
// import from 'passport';

const fackbookRoute = express.Router()

fackbookRoute.post('/facebook',
  passport.authenticate('facebook-token', { session: false }),
  function (req, res) {
    if (req.user) {
      res.status(200).json(req.user)
    } else {
      res.status(201).json({ "response": "unauthorized" })
    }
  })

passport.use('facebook-token', new FacebookTokenStrategy({
  clientID: "674107167040712",
  clientSecret: "a62bc1f838fc42772549705c9f183c51"
},
  async function (accessToken, refreshToken, profile, done) {
    // console.log(profile);

    var fbUser = {
      'email': profile.emails[0].value,
      'name': profile.name.givenName + ' ' + profile.name.familyName,
      'providerId': profile.id,
      "provider": profile.provider,
      'token': accessToken,
      'firstName': profile._json.first_name,
      'lastName': profile._json.last_name
    }

    let data: any = {}
    data.email = fbUser.email
    data.providerId = fbUser.providerId
    data.provider = fbUser.provider
    var result = await addTaskController.loginUserGoogle(data)
    if (result?.response) {
      var size = Object.keys(result).length;
      if (size != 0) {
        return done(null, { token: fbUser.token, response: result?.response })
      }
    }
    else {
      try {
        data.firstName = fbUser.firstName
        data.lastName = fbUser.lastName
        result = await addTaskController.registerUser(data)
        if (result?.response) {
          return done(null, { token: fbUser.token, response: result?.response });
        }
        else {
          return done(null, { "error": result?.error })
        }
      } catch (err) {
        console.log(err, "passport.ts file");
      }
    }
  }
));




// fackbookRoute.post("/facebook/tken", async (req, res) => {
//   console.log(req.body);
//   let user: any = req.body
//   console.log(user);

//   let data: any = {}
//   data.email = user.userEmail
//   data.providerId = user.providerId
//   data.provider = user.provider
//   var result = await addTaskController.loginUserGoogle(data)
//   if (result?.response) {
//     var size = Object.keys(result).length;
//     if (size != 0) {
//       var payloader = { subject: result?.response?.id };
//       var token = jwt.sign(payloader, "my first project", {
//         expiresIn: "4h",
//       });

//       // res.send(`${facebookconfig.facebookAuth.FRONTEND_HOST}/user`)
//       return res.status(200).json({ token: token, response: result?.response });
//     }
//   }
//   else {
//     try {
//       result = await addTaskController.registerUser(data)
//       if (result?.response) {
//         var payloader = { subject: result?.response?.id };
//         var token = jwt.sign(payloader, "my first project", {
//           expiresIn: "4h",
//         });
//         res.status(200).json({ token: token, response: result?.response });
//       }
//       else {
//         res.status(201).json({ "error": result?.error })
//       }
//     } catch (err) {
//       console.log(err, "passport.ts file");
//     }
//   }
// })




export default fackbookRoute

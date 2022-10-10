import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import config from "../key/config"
import addTaskController from "../controller/addTaskController"


passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});


passport.use(new GoogleStrategy({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: config.callbackURL
},
  async function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    
    return cb(null, profile);
  }
))   
import { Strategy as FacebookStrategy } from 'passport-facebook'
import passport from "passport";
import session from "express-session"

import config from "../key/facebookconfig"
import { registerDecorator } from 'class-validator';

passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function (obj:any, cb) {
    cb(null, obj);
  });
  
  passport.use(new FacebookStrategy({
      clientID: config.facebookAuth.clientID,
      clientSecret: config.facebookAuth.clientSecret,
      callbackURL: config.facebookAuth.callbackURL,
      // passReqToCallback : true,
     profileFields: ['id', 'emails', 'name'] //This
    }, function (accessToken, refreshToken, profile,  done) {
      // req.session.user = profile
      // console.log(profile);
      // console.log(profile,"profile");
      return done(null, profile);
      // 
    }
  ));
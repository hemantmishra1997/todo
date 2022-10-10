import express, { Request, Response, NextFunction } from "express";
import addTaskController from "../controller/addTaskController"
import jwt from "jsonwebtoken"
import passport from "passport";
import cros from "cors"

require('../passport/passport');


const oauthRoute = express.Router()


var demo = (req, res, next) => {
    console.log("mmm");
    next()

}



oauthRoute.get("/auth/google",  passport.authenticate('google', { scope: ['profile', 'email'] }))

// oauthRoute.get("/auth/google",(req,res)=>{
//     res.json("sdhfjkdf")
// })

oauthRoute.get("/auth/google/callback", demo, passport.authenticate('google', {
    successRedirect: '/auth/callback/success',
    failureRedirect: '/auth/callback/failure'
}))

// Success 
oauthRoute.get('/auth/callback/success', async (req, res) => {

    if (!req.user) {
        res.redirect('/auth/callback/failure');
    }
    else {
        let user: any = req.user
        let data: any = {}
        data.email = user._json.email
        data.providerId = user.id
        data.provider = user.provider
        var result = await addTaskController.loginUserGoogle(data)

        if (result?.response) {
            var size = Object.keys(result).length;
            if (size != 0) {
                var payloader = { subject: result?.response?.id };
                var token = jwt.sign(payloader, "my first project", {
                    expiresIn: "4h",
                });
                res.status(200).json({ token: token, response: result?.response });
            }
        }
        else {
            data.firstName = user._json.given_name
            data.lastName = user._json.family_name
            try {
                result = await addTaskController.registerUser(data)
                if (result?.response) {
                    var payloader = { subject: result?.response?.id };
                    var token = jwt.sign(payloader, "my first project", {
                        expiresIn: "4h",
                    });
                    res.status(200).json({ token: token, response: result?.response });
                }
                else {
                    res.status(201).json({ "error": result?.error })
                }
            } catch (err) {
                console.log(err, "passport.ts file");
            }
        }

    }
});

// failure
oauthRoute.get('/auth/callback/failure', (req, res) => {
    res.send("Error");
})





// oauthRoute.get("/auth/google/callback",passport.authenticate( 'google', { failureRedirect: '/login' }),function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   })

// // Success
// oauthRoute.get('/auth/callback/success' , (req , res) => {
// 	 console.log("ha");
// 	if(!req.user)
// 	res.redirect('/auth/callback/failure');
// 	res.send("Welcome ");
// });

// // failure
// oauthRoute.get('/auth/callback/failure' , (req , res) => {
// 	res.send("Error");
// })


export default oauthRoute
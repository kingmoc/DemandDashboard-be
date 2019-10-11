const express = require("express");
const router = express.Router();
require("dotenv").config();

//token import
const gentoken = require('../security/gen-token')

//model Import
const UserInfo = require('../models/UserMatchingJobs')

// server route = /auth

//Google Oauth2.0
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLECLIENT,
        clientSecret: process.env.GOOGLESECRET,
        callbackURL: process.env.CALLBACKURL
      },
      (accessToken, refreshToken, profile, done) => {

        let userInfo = {
            google_id: profile._json.sub,
            displayName: profile._json.name,
            picture: profile._json.picture,
        }

        UserInfo.findOne({google_id: userInfo.google_id})
            .then(currentRecord => {
                if(currentRecord) {
                    console.log('Already in DB', currentRecord)
                    done(null, userInfo)
                } else {
                    new UserInfo(userInfo)
                    .save()
                    .then(newRecord => {
                        console.log("New User", newRecord)
                        done(null, userInfo)
                    })
                }
            })

        // done(null, userInfo);
      }
    )
  );




router.get("/google", passport.authenticate("google", { scope: ['https://www.googleapis.com/auth/plus.login']}));

router.get('/google/callback', passport.authenticate("google", { session: false }), (req, res) => {
    const token = gentoken(req.user)
    
    res.redirect(`/dashboard?token=${token}`)
})



module.exports = router;
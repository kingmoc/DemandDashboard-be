const express = require("express");
const router = express.Router();
require("dotenv").config();

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

        console.log(profile)

        done(null, profile);
      }
    )
  );




router.get("/google", passport.authenticate("google", { scope: ['https://www.googleapis.com/auth/plus.login']}));

router.get('/google/callback', passport.authenticate("google", { session: false }), (req, res) => {
    res.redirect('/')
})



module.exports = router;
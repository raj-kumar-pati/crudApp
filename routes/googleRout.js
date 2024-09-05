import express from 'express';
import 'dotenv/config';
const google = express.Router();

import { googleSuccess,googleFailur } from '../controllers/googeControllers.js';
//pasport setup
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
import passport from 'passport';
import passportGoogle from 'passport-google-oauth2';
const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:process.env.clientID, // Your Credentials here.
    clientSecret:process.env.clientSecret, // Your Credentials here.
    callbackURL:process.env.callbackURL,
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));


//google auth route setup

// const passport = require('passport');
// const cookieSession = require('cookie-session');
// const session = require('express-session');
// require('./passport');
import session from 'express-session';


// app.use(cookieSession({
//     // name: 'google-auth-session',
//     // keys: ['key1', 'key2']
//     name: "session",
// 		keys: ["cyberwolve"],
// 		maxAge: 24 * 60 * 60 * 100,
// }));
google.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));

google.use(passport.initialize());
google.use(passport.session());
  

// app.get('/', (req, res) => {
//     res.send("<button><a href='/auth'>Login With Google</a></button>")
// });

// Auth 
google.get('/auth' , passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
}));

// Auth Callback
google.get( '/auth/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
}));

// Success 
google.get('/auth/callback/success' ,googleSuccess);

// failure
google.get('/auth/callback/failure' ,googleFailur)
export default google;



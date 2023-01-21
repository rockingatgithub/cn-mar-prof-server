const passport = require('passport');
const Customer = require('../models/customer');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID: "44918824988-cohh4f1c4035rqvb5s00hjnkvc0qmjqf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      console.log("The profile", profile)
    Customer.create({ email : profile.email, password: '1234' }, function (err, user) {
      return done(err, user);
    });
  }
));

// module.exports = passport
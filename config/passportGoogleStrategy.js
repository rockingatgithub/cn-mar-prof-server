const passport = require('passport');
const Customer = require('../models/customer');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
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

module.exports = passport
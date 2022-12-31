const passport = require('passport');
const Client = require('../models/client');
const Customer = require('../models/customer');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'my_key';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Client.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            Customer.findOne({id: jwt_payload.id}, function(err, customer) {
                if (err) {
                    return done(err, false);
                }
                if (customer) {
                    return done(null, customer);
                }
            })
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport
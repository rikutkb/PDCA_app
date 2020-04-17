const passport = require("passport");

var jwt=require('jsonwebtoken');
var JwtStrategy=require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;
require('dotenv').config();
var User=require('../../models/user')

class Authenticator{
  static initialize(app){
    app.use(passport.initialize());



  }
  static SetStrategy(){
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET_KEY;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({user_id: jwt_payload.sub}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              return done(null, user);
          } else {
              return done(null, false);
              // or you could create a new account
          }
      });
    }));
  }

  static authenticate(req,res,next){

  }

  static isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }else{
      res.status(401).json({
        error:'ログインしてください'
      })
    }
  }
}

module.exports=Authenticator;
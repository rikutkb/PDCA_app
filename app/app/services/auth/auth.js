const passport = require("passport");

var jwt=require('jsonwebtoken');
var JwtStrategy=require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;
require('dotenv').config();
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var User=require('../../models/user')

class Authenticator{
  static initialize(app){
    app.use(passport.initialize());

  }
  static SetStrategy(){
    var opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      // The secret that was used to sign the JWT
      secretOrKey: "secret",
      // The issuer stored in the JW
    }
    // const googleConfig = {
    //   clientID: process.env.GOOGLE_APP_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    //   callbackURL: `${process.env.URL_PATH}/authenticate/google/callback`,
    //   scope: ['email', 'profile'],
    // }
    // const twitterConfig={
    //   clientID: process.env.TWITTER_APP_ID,
    //   clientSecret: process.env.TWITTER＿SECRET,
    //   callbackURL: `${process.env.URL_PATH}/authenticate/twitter/callback`,
    //   scope: ['email', 'profile'],
    // }
/*    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.URL_PATH}/authenticate/google/callback`,
      scope: ['email', 'profile'],
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ user_id: profile.id }, function (err, user) {
        console.log(user)
        return cb(err, user);
      });
    }
    ));*/
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({
        where:{
          user_id:jwt_payload.user_id
        }
      }).then((user)=>{
        if(user){
          done(null,user);
        }else{
          done(null,false);
        }
      }).catch(err=>{
        return done(err,false);
      })
    }));
  }

  static authenticate(req,res,next){
    
    passport.authenticate('jwt',{session:false}),function(req,res){
      res.send(req.user.profile);
    }
  }

   gererateToken(userid){
    var token=jwt.sign({id:userid},config.SECRET_KEY,{
      expiresIn:60000
    })
    return token;
  }
  

}

module.exports.auth=Authenticator;
module.exports.passport=passport;
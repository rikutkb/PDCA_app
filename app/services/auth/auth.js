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
    var opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      // The secret that was used to sign the JWT
      secretOrKey: process.env.SECRET_KEY,
      // The issuer stored in the JW
    }
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

      console.log('jwt received'+jwt_payload);
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
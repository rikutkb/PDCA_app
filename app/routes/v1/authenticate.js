var express = require('express');
var router = express.Router();
var User=require('../../models/user');
var Goal=require('../../models/goal');
var GoalUser=require('../../models/goal_user');
const uuid=require('uuid');
var webclient = require("request");
require('dotenv').config();
var jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const saltRounds=10;
const  passport=require('../../services/auth/auth').passport;
function gererateToken(user_id){

  var token=jwt.sign(payload,process.env.SECRET_KEY,{
    expiresIn:60000
  })
  const payload ={
    user_id:user_id,
    token:token

  };
  return payload;
}
router.get('/twitter',passport.authenticate('twitter'));
router.get('/:google',passport.authenticate("google",function(req,res){
  console.log("JLFKJDS")
}));

router.get('/:google/callback',
passport.authenticate('google',{session:false,scope:['https://www.googleapis.com/auth/plus.login']}),
function(req,res){
  var toekn=generateToken(req.user.id);
  res.json({token:token})
}
)

router.post('/',(req,res)=>{
  var post_mail=req.body.mail;

  var post_pass=req.body.pass;
  User.findOne({
    where:{
      mail:post_mail
    }
  }).then((user)=>{
    if(user){
      
      bcrypt.compare(post_pass,user.dataValues.password_hash).then((isCorrectPassword)=>{
        if(isCorrectPassword){
          var token=jwt.sign(user.dataValues,process.env.SECRET_KEY,{
            expiresIn:60000
          })   ;
          delete user.dataValues.password_hash
          res.status(201).json(
            {auth:true,user_id:user.user_id,token:token,user:user}
          )
        }else{
          res.status(401).json({auth:false,token:null})

        }
      })
    }else{
      res.status(404).json({auth:false})
    }

  }).catch((err)=>{
    console.error(err);
    res.status(500).json({})
  })
})


module.exports = router;
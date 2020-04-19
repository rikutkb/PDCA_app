var express = require('express');
var router = express.Router();
var User=require('../../models/user');
var Goal=require('../../models/goal');
var GoalUser=require('../../models/goal_user');
const uuid=require('uuid');
var webclient = require("request");
require('dotenv').config();
var jwt=require('jsonwebtoken');
function gererateToken(userid){
  const payload ={
    user_id:userid
  };
  var token=jwt.sign(payload,process.env.SECRET_KEY,{
    expiresIn:60000
  })
  return token;
}

router.post('/',(req,res)=>{
  var post_mail=req.body.mail;

  var post_pass=req.body.pass;
  User.findOne({
    where:{
      mail:post_mail
    }
  }).then((user)=>{
    if(user){
      if(user.dataValues.password==post_pass){
        var token=jwt.sign(user.dataValues,process.env.SECRET_KEY,{
          expiresIn:60000
        })   
        res.status(200).json(
          {auth:true,user_id:user.user_id,token:token}
        )
      }else{
        res.status(401).json({auth:false,token:null})
      }
    }else{
      res.status(404).json({auth:false})
    }

  }).catch((err)=>{
    console.error(err);
    res.status(500).json({})
  })
})


module.exports = router;
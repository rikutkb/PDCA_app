var express = require('express');
var router = express.Router();
var goalRouter=require('./goal');
var User=require('../../models/user');
var uuid=require('uuid');
const bcrypt=require('bcrypt')
const saltRounds=10;
router.post('/new',function(req,res){
  var user_id=uuid.v4();
  var password=req.body.password
  bcrypt.hash(password,saltRounds,function(err,hash){
    User.findOne({
      where:{
        user_name:req.body.user_name
      }
    }).then((user)=>{
      if(user===null){

        User.create({
          user_id:user_id,
          user_name:req.body.user_name,
          screen_name:req.body.screen_name,
          mail:req.body.mail,
          password_hash:hash 
        }).then((user_)=>{
          delete user_.password_hash;
          res.status(201).send(user_);
          
        }).catch((err)=>{
          console.log(err)
          res.status(500).send("User creation failed");
        })

      }else{
        res.status(409).send("username is already used");
      }
    })
  })
})

router.put('/',function(req,res){
  if(req.body.password===undefined){
    var password=req.body.password
    bcrypt.hash(password,saltRounds,function(err,hash){
      User.create({
        user_id:req.body.user_id,
        user_name:req.body.user_name,
        screen_name:req.body.screen_name,
        mail:req.body.mail,
        password_hash:hash 
      }).then((user)=>{
        delete user.password_hash
        res.status(201).send(user);
      })
    })
  }else{
    User.upsert({
      user_id:req.body.user_id,
      user_name:req.body.user_name,
      screen_name:req.body.screen_name,
      mail:req.body.mail,
    })
  }

})

router.get('/',function(req,res){
  res.json({
    message:"hello,world"
  });
});
module.exports = router;

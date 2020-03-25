var express = require('express');
var router = express.Router();
var goalRouter=require('./goal');
var User=require('../../models/user');
var uuid=require('uuid');
router.post('/new',function(req,res){
  var user_id=uuid.v4();
  User.create({
    user_id:user_id,
    user_name:req.body.user_name,
    screen_name:req.body.screen_name,
    mail:req.body.mail,
    password:req.body.password
  }).then((user)=>{
    res.json(user);
  })
})

router.get('/',function(req,res){
  res.json({
    message:"hello,world"
  });
});
module.exports = router;

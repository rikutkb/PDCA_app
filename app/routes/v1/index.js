var express = require('express');
var router = express.Router();
var goalRouter=require('./goal');
var userRouter=require('./user');
var missionRouter=require('./mission');
var solutionRouter=require('./solution');

var authenfication=require('./authenticate');
var authenficator=require('../../services/auth/auth').auth;

var passport=require('../../services/auth/auth').passport;
router.use('/authenticate',authenfication);
var User=require('../../models/user');
router.use('/user',userRouter);
router.use('/Goal',passport.authenticate('jwt',{session:false}),missionRouter);
router.use('/Goal',passport.authenticate('jwt',{session:false}),goalRouter);
router.get('/',function(req,res){
  res.json({
    message:"hello,world"
  });
});
router.use('/',passport.authenticate('jwt',{session:false}),solutionRouter);


module.exports = router;

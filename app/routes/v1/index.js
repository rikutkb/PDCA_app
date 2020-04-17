var express = require('express');
var router = express.Router();
var goalRouter=require('./goal');
var userRouter=require('./user');
var missionRouter=require('./mission');
var solutionRouter=require('./solution');

var authenfication=require('./authenticate');

router.use('/authenticate',authenfication);
router.use('/user',userRouter);
router.use('/Goal',missionRouter);
router.use('/Goal',goalRouter);
router.use('/Goal',solutionRouter);
router.get('/',function(req,res){
  res.json({
    message:"hello,world"
  });
});

router.post('/',function(req,res){
  res.send({
    message:req.body.text
  })
})
module.exports = router;

var express = require('express');
var router = express.Router();
var goalRouter=require('./goal');
var userRouter=require('./user');
var missionRouter=require('./mission');
router.use('/user',userRouter);
router.use('/Goal',missionRouter)
router.use('/Goal',goalRouter);
router.get('/',function(req,res){
  res.json({
    message:"hello,world"
  });
});
module.exports = router;

var express = require('express');
var router = express.Router();
var goalRouter=require('./goal');
var userRouter=require('./user');
router.use('/goal',goalRouter);
router.use('/user',userRouter);
router.get('/',function(req,res){
  res.json({
    message:"hello,world"
  });
});
module.exports = router;

var express = require('express');
var router = express.Router();
var User=require('../../models/user');
var Goal=require('../../models/goal');
var GoalUser=require('../../models/goal_user');
const uuid=require('uuid');
router.get('/',function(req,res){
  var user=req.body.user;
  
  res.json({
    message:"hello,world"
  });
});

router.post('/',function(req,res){
  var user_id=req.body.user_id;
  var updatedAt=new Date();
  console.log(req.body);
  if(user_id){
    var goalId=uuid.v4();
    Goal.create({
      goal_id:goalId,
      goal_name:req.body.goalName.slice(0,255),
      period:req.body.period,
      current:req.body.current,
      gap:req.body.gap.slice(0,255),
      unit:req.body.unit.slice(0,255),
      updatedAt
    }).then((goal)=>{
      var ownership=true;
      var id=uuid.v4();
      GoalUser.create({
        goal_user_id:id,
        owner:ownership,
        user_id:user_id,
        goal_id:goalId
      }).then((goaluser)=>{
        res.json(goaluser);
      })
    })

  }else{
    res.json({
      status:'fail'
    })
  }

})
router.get('/:GoalId',function(req,res){
  var user=req.body.user;
  
  
});
router.post('/:GoalId',function(req,res){

});
router.get('/:GoalId/users',function(req,res){

});
router.get('/:GoalId/owners',function(req,res){

});

router.post('/:GoalId/users/:userId',function(req,res){

});
router.post('/:GoalId/owners/:userId',function(req,res){

})
router.delete('/:GoalId/users/:userId',function(req,res){

})
router.delete('/:GoalId/users/:userId',function(req,res){

})

router.delete('/:GoalId/owners/:userId',function(req,res){

})
module.exports = router;
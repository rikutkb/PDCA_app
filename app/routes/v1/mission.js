var express = require('express');
var router = express.Router();
var User=require('../../models/user');
var Mission=require('../../models/mission');
var uuid=require('uuid');
var SolutionRouter=require('./solution.js');
router.use('/:MissionId/Solution',SolutionRouter);

router.post('/:GoalId/Mission',function(req,res){
  var mission_id=uuid.v4();
  var updatedAt=new Date();

  Mission.create({
    mission_id:mission_id,
    mission_name:req.body.mission_name,
    goal_id:req.body.goal_id,
    impact:req.body.impact,
    easy:req.body.easy,
    time:req.body.time,
    do:req.body.do,
    updatedAt
  }).then((mission)=>{
    res.json(mission);
  })
})

router.get('/:GoalId/Mission',function(req,res){
  var goal_id=req.params.GoalId;
  console.log(goal_id);
  Mission.findAll({
    where:{
      goal_id:goal_id
    }
  }).then((missions)=>{
    var missions_=[];
    for( var mission of missions){
      missions_.push(mission.dataValues)
    }
    res.status(200).json(missions_);
  })
});

router.post('/:GoalId/Mission/:MissionId',function(req,res){
  var goal_id=req.params.GoalId;
  var mission_id=req.params.MissionId;
  Mission.upsert({
    mission_id:mission_id,
    mission_name:req.body.mission.mission_name,
    impact:req.body.mission.impact,
    easy:req.body.mission.easy,
    time:mission.body.mission.time,
    do:req.body.mission.do,
    updatedAt
  })
  
})


router.delete('/:GoalId/Mission/:MissionId',function(req,res){
  var goal_id=req.params.GoalId;
  
})
module.exports = router;

var express = require('express');
var router = express.Router();
var User=require('../../models/user');
var Mission=require('../../models/mission');
var uuid=require('uuid');
var SolutionRouter=require('./solution.js');
var Solution=require('../../models/solution');
var Goal=require('../../models/goal')
router.post('/:GoalId/Mission',function(req,res){
  var mission_id=uuid.v4();
  var updatedAt=new Date();
  var user_id=req.user.dataValues.user_id;
  var goal_id=req.params.GoalId;
  console.log(req.body)
  console.log("add mission")
  Mission.create({
    mission_id:mission_id,
    mission_name:req.body.mission_name,
    goal_id:goal_id,
    startDate:req.body.startDate,
    endDate:req.body.endDate,
    impact:req.body.impact,
    easy:req.body.easy,
    time:req.body.time,
    do:req.body.do,
    done:false,
    updatedAt
  }).then((mission)=>{
    var result={Mission:mission.dataValues}
    res.json(result);
  })
})

router.get('/:GoalId/Mission',function(req,res){
  var goal_id=req.params.GoalId;
  var user_id=req.user.dataValues.user_id;

  console.log(goal_id);

  Goal.findOne({
    where:{
      goal_id:goal_id
    }
  }).then((goal)=>{
    Mission.findAll({
      where:{
        goal_id:goal_id
      }
    }).then((missions)=>{
  
      var missions_=[];
      for( var mission of missions){
        missions_.push(mission.dataValues)
      }
      var result={Goal:goal.dataValues,Missions:missions_}
      res.status(200).json(result);
    })
  })

});

router.put('/:GoalId/Mission/:MissionId',function(req,res){
  console.log("hoge")
  var mission_id=req.params.MissionId
  var updatedAt=new Date();
  Mission.upsert({
    mission_id:mission_id,
    goal_id:req.body.goal_id,
    startDate:req.body.startDate,
    endDate:req.body.endDate,
    mission_name:req.body.mission_name,
    impact:req.body.impact,
    easy:req.body.easy,
    time:req.body.time,
    do:req.body.do,
    done:req.body.done,
    updatedAt
  }).then((mission)=>{
    var result={Mission:mission.dataValues}
    res.json(result);
  })
});

router.post('/:GoalId/Mission/:MissionId',function(req,res){
  var user_id=req.user.dataValues.user_id;

  var goal_id=req.params.GoalId;
  var mission_id=req.params.MissionId;
  Mission.findOne({
    where:{
      mission_id:mission_id
    }
  }).then((mission)=>{
    res.json(mission.dataValues);
  })
})

router.post('/:GoalId/Mission/:MissionId',function(req,res){
  var user_id=req.user.dataValues.user_id;

  var goal_id=req.params.GoalId;
  var mission_id=req.params.MissionId;
  Mission.upsert({
    mission_id:mission_id,
    mission_name:req.body.mission.mission_name,
    startDate:req.body.startDate,
    endDate:req.body.endDate,
    impact:req.body.mission.impact,
    easy:req.body.mission.easy,
    time:mission.body.mission.time,
    do:req.body.mission.do,
    done:req.body.done,
    updatedAt
  }).then((mission)=>{
    res.json(mission.dataValues);
  })
  
})


router.delete('/:GoalId/Mission/:MissionId',function(req,res){
  var goal_id=req.params.GoalId;
  var mission_id=req.params.MissionId;
  console.log(mission_id)
  Solution.destroy({
    where:{
      mission_id:mission_id
    }
  }).then(()=>{
    Mission.destroy({
      where:{
        mission_id:mission_id
      }
    }).then(()=>{
      res.status(201).send('Mission delte success')
    })
  }).catch((err)=>{
    console.log(err)

  })
})
module.exports = router;

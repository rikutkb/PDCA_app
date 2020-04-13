var express = require('express');
var router = express.Router();
var User=require('../../models/user');
var Mission=require('../../models/mission');
var uuid=require('uuid');
var Solution=require('../../models/solution');



router.post('/:GoalId/Mission/:MissionId/Solution',function(req,res){
  var mission_id=req.params.MissionId;
  var solution_id=uuid.v4();
  var updatedAt=new Date();
  Solution.create({
    solution_name:req.body.solution_name,
    solution_id:solution_id,
    mission_id:mission_id,
    impact:req.body.impact,
    easy:req.body.easy,
    time:req.body.time,
    do:req.body.do,
    updatedAt
  }).then((solution)=>{
    res.json(solution);
  })
})

router.get('/:GoalId/Mission/:MissionId/Solution',function(req,res){
  var goal_id=req.params.GoalId;
  var mission_id=req.params.MissionId;
  Solution.findAll({
    where:{
      mission_id:mission_id
    }
  }).then((solutions)=>{
    res.json(solutions);
  })


});
router.delete('/:GoalId/Mission/:MissionId/Solution/:SolutionId',function(req,res){
  var solution_id=req.params.solution_id;

})
router.post('/:GoalId/Mission/:MissionId/Solution/:SolutionId',function(req,res){
  var solution_id=req.params.SolutionId;
  Solution.upsert({
    solution_name:req.body.solution.solution_name,
    solution_id:solution_id,
    impact:req.body.mission.impact,
    easy:req.body.mission.easy,
    time:mission.body.mission.time,
    do:req.body.mission.do,
    updatedAt
  }).then((solution)=>{
    res.json(solution);
  })  
})

router.get('/:GoalId/Mission/:MissionId/Solution/:SolutionId/log',function(req,res){

})
router.post('/:GoalId/Mission/:MissionId/Solution/:SolutionId/log',function(req,res){

})

router.get('/:GoalId/Mission/:MissionId/Solution/:SolutionId/frequency',function(req,res){

})
module.exports = router;

var express = require('express');
var router = express.Router();
var User=require('../../models/user');
var Mission=require('../../models/mission');
var Goal=require('../../models/goal')
var uuid=require('uuid');
var Solution=require('../../models/solution');
var SolutionLog=require('../../models/solution_log')
var SolutionFrequency=require('../../models/solution_frequency')
function getSolutionListFromGoalId(goal_id){
  return new Promise(function(resolve,reject){
    Mission.findAll({
      where:{
        goal_id:goal_id
      }
    }).then((missions)=>{
      var MissionId_list=[]
      missions.map((mission)=>MissionId_list.push(mission.mission_id))
      var promises=[]
      var solutions=[]
      MissionId_list.forEach((mission_id)=>{
        promises.push(Solution.findAll({
          where:{
            mission_id:mission_id
          }
        }).then((solutions_)=>{
          solutions_.map((solution)=>solutions.push(solution))
        }))
      })
      Promise.all(promises).then(()=>{
        resolve(solutions)
      })
    })
  })
}
function getSolutions(goal_id){
  return new Promise(function(resolve,reject){
    
    Goal.findOne({
      where:{
        goal_id:goal_id
      }
    }).then((goal_)=>{
      getSolutionListFromGoalId(goal_id).then((result)=>{
        
        var goal=goal_.dataValues
        goal.todos=result
        resolve(goal)
      })
    })
  })
}

router.post('/Todos',function(req,res){
  console.log('gettign todos')
  var GoalId_list=req.body.GoalId_list
  var promises=[]
  var goals=[]

  GoalId_list.forEach((goal_id)=>{
    promises.push(
      getSolutions(goal_id).then((result)=>{
        if(result.todos.length>0){
          goals.push(result)

        }
    }))
  })
  Promise.all(promises).then((result)=>{
    res.json({todos:goals})
  })

})

router.post('/Mission/:MissionId/Solution',function(req,res){
  
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
    res.json(solution.dataValues);
  })
})

router.get('/Mission/:MissionId/Solution',function(req,res){
  var mission_id=req.params.MissionId;
  Mission.findOne({
    where:{
      mission_id:mission_id
    }
  }).then((mission)=>{
    Solution.findAll({
      where:{
        mission_id:mission_id
      }
    }).then((solutions)=>{
      var solutions_=[];
      for(var solution of solutions){
        solutions_.push(solution.dataValues)
      }
      var result={mission:mission.dataValues,solutions:solutions_}
      res.json(result);
    })
  })



});

function solutionDelete(solution_id){
  return new Promise(function(resolve,reject){
    var promises=[]
    promises.push(SolutionFrequency.destroy({
      where:{
        solution_id:solution_id
            }
    }).catch((err)=>{
      reject(err)
    }))
    promises.push(SolutionLog.destroy({
      where:{
        solution_id:solution_id
      }
    }).catch((err)=>{
      reject(err)
    }))
    promises.push(Solution.destroy({
      where:{
        solution_id:solution_id
      }
    }).catch((err)=>{
      reject(err)
    }))
    Promise.all(promises).then(()=>{
      resolve()
    }).catch((err)=>{
      reject(err)
    })
  }) 
}



router.delete('/Mission/:MissionId/Solution/:SolutionId',function(req,res){
  var solution_id=req.params.SolutionId;
  console.log(solution_id)
  solutionDelete(solution_id).then(()=>{
    res.status(201).send('Solution Deleted')
  }).catch((err)=>{
    console.log(err)
    res.status(500).send(err)
  })

})
router.put('/Mission/:MissionId/Solution/:SolutionId',function(req,res){
  var solution_id=req.params.SolutionId;
  Solution.upsert({
    solution_name:req.body.solution_name,
    solution_id:solution_id,
    impact:req.body.impact,
    easy:req.body.easy,
    time:req.body.time,
    do:req.body.do,
    updatedAt
  }).then((solution)=>{
    res.json(solution.dataValues);
  })  
})

function getSolutionLog(solution_id){
  SolutionLog.findAll({
    where:{
      solution_id:solution_id
    }
  }).then((solution_logs)=>{
    return solution_logs
  })
}


router.get('/Mission/:MissionId/Solution/:SolutionId/log',function(req,res){
  var solution_id=req.params.SolutionId
  getSolutionLog(solution_id).then((result)=>{
    res.status(201).send(result)
  })

})
router.post('/Mission/:MissionId/Solution/:SolutionId/log',function(req,res){
  var solution_id=req.params.SolutionId
  SolutionLog.create({
    solution_id:solution_id,
    date:req.body.date
  }).then((solutionlog)=>{
    res.status(201).send(solutionlog)
  })
})


router.get('/Mission/:MissionId/Solution/:SolutionId/frequency',function(req,res){
  var solution_id=req.params.SolutionId
  getSolutionFrequency(solution_id).then((result)=>{
    res.status(201).send(result)
  })})

router.post('/Mission/:MissionId/Solution/:SolutionId/frequency',function(req,res){
  var solution_id=req.params.SolutionId
  SolutionFrequency.upsert({
    solution_id:solution_id,
    day:req.body.day
  }).then((SolutionFrequency)=>{
    resolve(SolutionFrequency)
  }).catch((err)=>{
    reject(err)
  })
})


function getSolutionLog(solution_id){
  return new Promise(function(resolve,reject){
    SolutionFrequency.find({
      solution_id:solution_id
    }).then((SolutionFrequency)=>{
      resolve(SolutionFrequency)
    }).catch((err)=>{
      reject(err)
    })
  })
}

function getSolutionFrequency(solution_id){
  return new Promise(function(resolve,reject){
    SolutionFrequency.find({
      solution_id:solution_id
    }).then((SolutionFrequency)=>{
      resolve(SolutionFrequency)
    }).catch((err)=>{
      reject(err)
    })
  })
}


module.exports = router;

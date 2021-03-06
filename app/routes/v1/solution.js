var express = require('express');
var router = express.Router();
var User=require('../../models/user');
var Mission=require('../../models/mission');
var Goal=require('../../models/goal')
var uuid=require('uuid');
var Solution=require('../../models/solution');
var SolutionLog=require('../../models/solution_log');
const SLFunctions=require('./solution_log');

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
    startDate:req.body.startDate,
    endDate:req.body.endDate,
    impact:req.body.impact,
    easy:req.body.easy,
    time:req.body.time,
    do:req.body.do,
    done:false,
    duration:req.body.duration,
    week_bit:req.body.week_bit,
    updatedAt
  }).then((solution)=>{
    res.status(201).send({solution:solution});
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
      var solutions_=solutions.map(solution_=>solution_.dataValues);
      res.status(201).json({solutions:solutions_});
    })
  });
});

function solutionDelete(solution_id){
  return new Promise(function(resolve,reject){
    var promises=[]

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
  solutionDelete(solution_id).then(()=>{
    res.status(201).send('Solution Deleted')
  }).catch((err)=>{
    res.status(500).send(err)
  })
})
router.put('/Mission/:MissionId/Solution/:SolutionId',function(req,res){
  var solution_id=req.params.SolutionId;
  var updatedAt=new Date();
  Solution.upsert({
    solution_name:req.body.solution_name,
    mission_id:req.body.mission_id,
    solution_id:solution_id,
    startDate:req.body.startDate,
    endDate:req.body.endDate,
    impact:req.body.impact,
    easy:req.body.easy,
    time:req.body.time,
    do:req.body.do,
    done:req.body.done,
    duration:req.body.duration,
    week_bit:req.body.week_bit,
    updatedAt
  }).then((solution)=>{
    var result={
      solution:solution.dataValues
    }
    res.status(201).json(result);
  }).catch((err)=>{
    res.status(500).send(err)
  })
})



router.get('/Mission/:MissionId/Solution/:SolutionId/log',function(req,res){
  var solution_id=req.params.SolutionId
  SLFunctions.GetSolutionlogs(solution_id).then((result)=>{
    res.status(201).json({solution_logs:result})
  })
})

router.post('/Mission/:MissionId/Solution/:SolutionId/log',function(req,res){
  var solution_id=req.params.SolutionId
  var data=req.body;
  var date_=new Date(data.date);
  var date=new Date(date_.getFullYear(),date_.getMonth(),date_.getDate());
  data.date=date;
  SLFunctions.PostSolutionlog(solution_id,data).then((result)=>{
    res.status(201).json({solution_logs:result});
  }).catch((err)=>{
    console.log(err);
    res.status(500).json('log create failed')
  })
})
router.put('/Mission/:MissionId/Solution/:SolutionId/log',function(req,res){
  var solution_id=req.params.SolutionId
  var data=req.body;
  SLFunctions.EditSolutionlog(solution_id,data).then((result)=>{
    res.status(201).json({solution_logs:result});
  }).catch((err)=>{
    console.log(err);
    res.status(500).json('log create failed')
  })
})

module.exports = router;


var GoalUser=require('../../models/goal_user');
var Mission=require('../../models/mission')
var Solution=require('../../models/solution')

function CheckPermissionGoal(goal_id,user_id){
  return new Promise(function(resolve,reject){
    GoalUser.findAll({
      where:{
        goal_id: goal_id
      }
    }).then((users)=>{
      if(users.length==0){
        resolve(404);
      }
      if(users.find((user)=>user.user_id==user_id)){
        resolve(201);
      }else{
        resolve(403);
      }
    })
  })
}
function CheckPermissionMissionId(mission_id,user_id){
  return new Promise(function(resolve,reject){
    Mission.findOne({
      where:{
        mission_id:mission_id
      }
    }).then((mission)=>{
      if(mission){
        CheckPermissionGoal(mission.goal_id,user_id).then((result)=>{
          resolve(result);
        })
      }else{
        resolve(404);
      }

    })
  })
}
function CheckPermissionSolutionId(solution_id,user_id){
  return new Promise(function(resolve,reject){
    Solution.findOne({
      where:{
        solution_id:solution_id
      }
    }).then((solution)=>{
      if(solution){
        CheckPermissionMissionId(solution.mission_id,user_id).then((result)=>{
          resolve(result);
        })
      }else{
        resolve(404);
      }

    })
  })
}

module.exports ={CheckPermissionMissionId,CheckPermissionGoal,CheckPermissionSolutionId};
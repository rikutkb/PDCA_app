var Solution=require('../../models/solution');
var SolutionLog=require('../../models/solution_log')



function postSolutionLog(solution_id,data){

  return new Promise(function(resolve,reject){
    var date=new Date();
    SolutionLog.create({
      solution_id:solution_id,
      date:date,
      time:data.time,
      memo:data.memo,
      done:false,
      postponed:false,
      progress:data.progress,
      reason:data.reason
    }).then((solution_log)=>{
      resolve(solution_log.dataValues)
    }).catch((err)=>{
      resolve(err)
    })
  })
}

function EditSolutionlog(solution_id,data){
  return new Promise(function(resolve,reject){
    var index=data.index;
    SolutionLog.upsert({
      solution_id:solution_id,
      index:index,
      time:data.time,
      memo:data.memo,
      done:data.done,
      postponed:data.postponed,
      progress:data.progress,
      reason:data.reason
  
    }).then((solutionlog)=>{
      resolve(solutionlog.dataValues)
    })
  })
}
function DeleteSolutionlog(solution_id){
  return new Promise(function(resolve,reject){
    Solutionlog.destroy({
      where:{
        solution_id:solution_id,
        index:data.index
      }
    }).then((solutionlog)=>{
      resolve(solutionlog.dataValues)
    })
  })
}
function GetSolutionlogs(solution_id){
  return new Promise(function(resolve,reject){
    Solutionlog.findAll({
      where:{
        solution_id:solution_id
      }
    }).then((solution_logs)=>{
      resolve(solution_logs)
    })
  })
}

module.exports={postSolutionLog,EditSolutionlog,GetSolutionlogs,DeleteSolutionlog
};
var Solution=require('../../models/solution');
var SolutionLog=require('../../models/solution_log')



function PostSolutionlog(solution_id,data){
  return new Promise(function(resolve,reject){
    console.log(data)

    SolutionLog.findOne({
      where:{
        date:data.date,
        solution_id:solution_id,
      }
    }).then((Solutionlog_)=>{
      if(Solutionlog_==null){
        SolutionLog.create({
          solution_id:solution_id,
          date:data.date,
          time:data.time,
          memo:data.memo,
          done:data.done,
          postponed:data.postponed,
          progress:data.progress,
          reason:data.reason,
          
        }).then((solution_log)=>{
          resolve(solution_log.dataValues)
        }).catch((err)=>{
          resolve(err)
        })
      }else{
        var index=Solutionlog_.index;
        SolutionLog.upsert({
          solution_id:solution_id,
          index:index,
          date:data.date,
          time:data.time,
          memo:data.memo,
          done:data.done,
          postponed:data.postponed,
          progress:data.progress,
          reason:data.reason
      
        }).then((solutionlog)=>{
          resolve(solutionlog.dataValues)
        }).catch((err)=>{
          resolve(err);
        })
      }
    })

  })
}

function EditSolutionlog(solution_id,data){
  return new Promise(function(resolve,reject){
    var index=data.index;
    SolutionLog.upsert({
      solution_id:solution_id,
      index:index,
      date:data.date,
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
    SolutionLog.destroy({
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
    SolutionLog.findAll({
      where:{
        solution_id:solution_id
      },
      order:[
        ['date','DESC']
      ]
    }).then((solution_logs)=>{

      resolve(solution_logs)
    })
  })
}

module.exports={PostSolutionlog,EditSolutionlog,GetSolutionlogs,DeleteSolutionlog
};
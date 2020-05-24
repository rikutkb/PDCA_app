var Solution=require('../../models/solution');
var SolutionLog=require('../../models/solution_log')
var SolutionFrequency=require('../../models/solution_frequency')


function postSolutionFrequnency(solution_id,day_bit){

  return new Promise(function(resolve,reject){
    SolutionFrequency.create({
      solution_id:solution_id,
      Day:day_bit,
      do:true
    }).then((solutionfrequency)=>{
      resolve(solutionfrequency.dataValues)
    })
  })
}

function EditSolutionFrequency(solution_id,day_bit){
  return new Promise(function(resolve,reject){
    SolutionFrequency.upsert({
      where:{
        solution_id:solution_id,
        Day:day_bit,
        do:true
      }
    }).then((solutionfrequency)=>{
      resolve(solutionfrequency.dataValues)
    })
  })
}
function DeleteSolutionFrequency(solution_id){
  return new Promise(function(resolve,reject){
    SolutionFrequency.destroy({
      where:{
        solution_id:solution_id
      }
    }).then((solutionfrequency)=>{
      resolve(solutionfrequency.dataValues)
    })
  })
}
function GetSolutionFrequencies(solution_id_list){
  Promise.all(solution_id_list.map(solution_id=>GetSolutionFrequency(solution_id))).then((results)=>{
    return results;
  })
}
function GetSolutionFrequency(solution_id){
  return new Promise(function(resolve,reject){
    SolutionFrequency.findOne({
      where:{
        solution_id:solution_id
      }
    }).then((solution_frequency)=>{
      resolve(solution_frequency.dataValues)
    })
  })
}

module.exports={postSolutionFrequnency,EditSolutionFrequency,GetSolutionFrequency,DeleteSolutionFrequency,GetSolutionFrequencies
};
var express = require('express');
var router = express.Router();
var User=require('../../models/user');
var Goal=require('../../models/goal');
var GoalUser=require('../../models/goal_user');
var Mission=require('../../models/mission')
var Solution=require('../../models/solution')
const uuid=require('uuid');
var webclient = require("request");
function FindGoals (goal_user){
    Goal.findOne({
      where:{
        goal_id:goal_user.goal_id
      }
    }).then((goal)=>{
      console.log(goal.dataValues);
      return goal.dataValues;
    })

}

router.get('/',(req,res)=>{
  var user_id=req.user.dataValues.user_id;
  var promises=[];
  var goals=[];
    GoalUser.findAll({
      where:{
        user_id:user_id
      }
    }).then((goalusers)=>{
      for(var G of goalusers){
        promises.push(Goal.findOne({
          where:{
            goal_id:G.goal_id
          }
        }).then((goal)=>{
          if(goal!=null){
            goals.push(goal.dataValues);

          }
        })
        )
      }
      Promise.all(promises).then(()=>{
        res.json({goals:goals})
      })
    }).catch((error)=>{
      console.error(error);
    })


});

router.put('/Goal/:GoalId',function(req,res){
  var goal_id=req.params.GoalId
  Goal.upsert({
    goal_id:goal_id,
    goal_name:req.body.goal_name.slice(0,255),
    period:req.body.period,
    current:req.body.current,
    gap:req.body.gap.slice(0,255),
    unit:req.body.unit.slice(0,255),
  }).then((goal)=>{
    res.status(201).send(goal)
  }).catch((err)=>{
    res.status(500).send(err)
  })
})


router.post('/',function(req,res){
  var user_id=req.user.dataValues.user_id;
  var updatedAt=new Date();
  if(user_id){
    var goalId=uuid.v4();
    Goal.create({
      goal_id:goalId,
      goal_name:req.body.goal_name.slice(0,255),
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
        res.json({goal:goal.dataValues});
      })
    })
  }else{
    res.json({
      status:'fail'
    })
  }
})
router.get('/:GoalId',function(req,res){
  var user_id=req.user.dataValues.user_id;
  var goal_id=req.params.GoalId;
  req.body.GoalId=goal_id;
  Goal.findOne({
    where:{
      goal_id:goal_id
    }
  }).then((goal)=>{
  var result={goal:goal.dataValues}
  res.json(result);
  });
  
});
router.post('/:GoalId',function(req,res){
  var goal_id=req.params.GoalId;
  Goal.upsert({
    goal_id:goal_id,
    goal_name:req.body.goalName.slice(0,255),
    period:req.body.period,
    current:req.body.current,
    gap:req.body.gap.slice(0,255),
    unit:req.body.unit.slice(0,255),
    updatedAt
  }).then((goal)=>{

    res.json(goal.dataValues);
  })

});
router.get('/:GoalId/users',function(req,res){

  var goal_id=req.params.GoalId;
  GoalUser.findAll({
    where:{
      goal_id:goal_id
    }
  }).then((goals)=>{
    var users=[];
    for(var goal of goals){
      users.push(goal.user_id);
    }
    res.json(users);
  })

});
router.delete('/:GoalId',function(req,res){
  var goal_id=req.params.GoalId;
  var mission_id_list=[];

  Mission.findAll({
    where:{
      goal_id:goal_id
    }
  }).then((missions)=>{
    
    missions.map((mission)=>mission_id_list.push(mission.mission_id))
    
  }).then(()=>{
    var promises=[]
    promises.push(
      Mission.destroy({
        where:{
          goal_id:goal_id
        }
    }))
    promises.push(
      Goal.destroy({
        where:{
          goal_id:goal_id
        }
      })
    )
    promises.push(
      GoalUser.destroy({
        where:{
          goal_id:goal_id
        }
      })
    )


    mission_id_list.forEach((mission_id)=>{
      promises.push(
        Solution.destroy({
          where:{
            mission_id:mission_id
          }
        })
      )
    })
    Promise.all(promises).then(()=>{
      res.status(201).send('Goal delete finished')
    })
  })


})
router.get('/:GoalId/owners',function(req,res){
  var goal_id=req.params.GoalId;
  GoalUser.findAll({
    where:{
      goal_id:goal_id
    }
  }).then((goals)=>{
    var user_ids=[];
    for (var goal of goals){

      if(goal.owner){

        user_ids.push(goal.user_id)

      }
    }
    res.json(user_ids);
  })
});

router.post('/:GoalId/users/:userId',function(req,res){
  var goalId=req.params.GoalId;
  var userId=req.params.userId;

  var owner=false;
  GoalUser.create({
    goal_id:goalId,
    user_id:userId,
    owner:owner
  }).then((goaluser)=>{
    res.json(goaluser.dataValues);
  })
});
router.post('/:GoalId/owners/:userId',function(req,res){
  var goalId=req.params.GoalId;
  var userId=req.params.userId;

  var owner=true;
  GoalUser.create({
    goal_id:goalId,
    user_id:userId,
    owner:owner
  }).then((goaluser)=>{
    res.json(goaluser.dataValues);
  })
})
router.delete('/:GoalId/users/:userId',function(req,res){
  

})
router.delete('/:GoalId/users/:userId',function(req,res){

})

router.delete('/:GoalId/owners/:userId',function(req,res){

})
module.exports = router;
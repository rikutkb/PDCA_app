var Goal=require('../../models/goal');
var Mission=require('../../models/mission');
var Solution=require('../../models/solution');
var User=require('../../models/user');
var GoalLog=require('../../models/goal_log');
var GoalUser=require('../../models/goal_user');

var Adgust=require('../../models/adgust');
var MissionLog=require('../../models/mission_log');
var SolutionLog=require('../../models/solution_log');
var GoalLog=require('../../models/goal')
require('dotenv').config();

class DBInitializer{
  static Initialize(app){

    User.sync().then(()=>{
      GoalUser.belongsTo(User,{foreignKey:'user_id'});
    
    });
    
    Goal.sync().then(()=>{
      Adgust.belongsTo(Goal,{foreignKey:'goal_id'});
      Adgust.sync();
      GoalUser.belongsTo(Goal,{foreignKey:'goal_id'});
      GoalLog.belongsTo(Goal,{foreignKey:'goal_id',sourceKey:'goal_id'});
      GoalLog.sync();
      Mission.belongsTo(Goal,{foreignKey:'goal_id',sourceKey:'goal_id'});
      Mission.sync().then(()=>{
        MissionLog.belongsTo(Mission,{foreignKey:'mission_id'});
        MissionLog.sync();
        Solution.belongsTo(Mission,{foreignKey:'mission_id',sourceKey:'mission_id'});
        Solution.sync().then(()=>{
          SolutionLog.belongsTo(Solution,{foreignKey:'solution_id',sourceKey:'solution_id'});
          SolutionLog.sync();
    
        })
      })
    
    });
    GoalUser.sync();
  }
}

module.exports=DBInitializer;
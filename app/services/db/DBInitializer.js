var Goal=require('../../models/goal');
var Mission=require('../../models/mission');
var Solution=require('../../models/solution');
var User=require('../../models/user');
var GoalLog=require('../../models/goal_log');
var GoalUser=require('../../models/goal_user');
var SolutionFrequency=require('../../models/solution_frequency');
var SolutionLog=require('../../models/solution_log');
require('dotenv').config();

class DBInitializer{
  static Initialize(app){

    User.sync().then(()=>{
      GoalUser.belongsTo(User,{foreignKey:'user_id'});
    
    });
    
    Goal.sync().then(()=>{
      GoalUser.belongsTo(Goal,{foreignKey:'goal_id'});
      GoalLog.belongsTo(Goal,{foreignKey:'goal_id',sourceKey:'goal_id'});
      GoalLog.sync();
      Mission.belongsTo(Goal,{foreignKey:'goal_id',sourceKey:'goal_id'});
      Mission.sync().then(()=>{
        Solution.belongsTo(Mission,{foreignKey:'mission_id',sourceKey:'mission_id'});
        Solution.sync().then(()=>{
          SolutionLog.belongsTo(Solution,{foreignKey:'solution_id',sourceKey:'solution_id'});
          SolutionLog.sync();
          SolutionFrequency.belongsTo(Solution,{foreignKey:'solution_id',sourceKey:'solution_id'});
          SolutionFrequency.sync();
    
        })
      })
    
    });
    GoalUser.sync();
  }
}

module.exports=DBInitializer;
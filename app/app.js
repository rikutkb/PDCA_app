var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var Goal=require('./models/goal');
var Mission=require('./models/mission');
var Solution=require('./models/solution');
var User=require('./models/user');
var GoalLog=require('./models/goal_log');
var GoalUser=require('./models/goal_user');
var SolutionFrequency=require('./models/solution_frequency');
var SolutionLog=require('./models/solution_log');




//データベース消去後起動すると一回エラーが出るが、もう一回起動する


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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var v1Router = require('./routes/v1/index');

app.use('/api/v1', v1Router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);

module.exports=app;
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

User.belongsToMany(Goal,{through:GoalUser});
Goal.belongsToMany(User,{through:GoalUser});

Goal.hasMany(Mission,{foreignKey:'goal_id',sourceKey:'goal_id'});
Mission.belongsTo(Goal,{foreignKey:'goal_id',targetKey:'goal_id'});
Goal.hasMany(GoalLog,{foreignKey:'goal_id',sourceKey:'goal_id'});
GoalLog.belongsTo(Goal,{foreignKey:'goal_id',targetKey:'goal_id'});

Mission.hasMany(Solution,{foreignKey:'mission_id',sourceKey:'mission_id'});
Solution.belongsTo(Mission,{foreignKey:'mission_id',targetKey:'mission_id'});

Solution.hasMany(SolutionLog,{foreignKey:'solution_id',sourceKey:'solution_id'});
SolutionLog.belongsTo(Solution,{foreignKey:'solution_id',targetKey:'solution_id'});

Solution.hasMany(SolutionFrequency,{foreignKey:'solution_id',sourceKey:'solution_id'});
SolutionFrequency.belongsTo(Solution,{foreignKey:'solution_id',targetKey:'solution_id'});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var v1Router = require('./routes/v1/index');
app.use('/api/v1/', v1Router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);
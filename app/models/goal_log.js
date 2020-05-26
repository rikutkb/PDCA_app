'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const GoalLog=loader.database.define('goal_logs',{
  goal_id:{
    type:Sequelize.UUID,
    primaryKey:true,
    allowNull:false
  },
  date:{
    type:Sequelize.DATE,
    allowNull:false
  },
  log:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
},{
  freezeTableName:true
}
)

module.exports=GoalLog;
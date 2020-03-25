'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const GoalUser=loader.database.define('goaluser',{
  goal_user_id:{
    type:Sequelize.UUID,
    primaryKey:true,
    allowNull:false
  },
  owner:{
    type:Sequelize.BOOLEAN,
    allowNull:false
  }, goal_id:{
    type:Sequelize.UUID,
    allowNull:false
  },user_id:{
    type:Sequelize.UUID,
    allowNull:false
  }
},{
  freezeTableName:true
}
)

module.exports=GoalUser;
'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const GoalUser=loader.database.define('goals',{
  goal_id:{
    type:Sequelize.UUIDV4,
    primaryKey:true,
    allowNull:false
  },
  user_id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull:false
  },
  owner:{
    type:Sequelize.BOOLEAN,
    allowNull:false
  }
},{
  freezeTableName:true
}
)

module.exports=GoalUser;
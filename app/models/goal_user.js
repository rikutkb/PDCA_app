'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const GoalUser=loader.database.define('goaluser',{
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
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
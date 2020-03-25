'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const User=loader.database.define('users',{
  user_id:{
    type:Sequelize.UUID,
    primaryKey:true,
    allowNull:false
  },
  user_name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  screen_name:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
  },
  mail:{
    type:Sequelize.STRING,
    allowNull:true,
    unique:true
  },
  password:{
    type:Sequelize.STRING
  }
},{
  freezeTableName:true,
  timestamps:false
}
)

module.exports=User;
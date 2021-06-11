'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const MissionLog=loader.database.define('mission_logs',{
  mission_id:{
    type:Sequelize.UUID,
    primaryKey:true,
    allowNull:false
  },
  indexes:{
    type:Sequelize.INTEGER,
    primaryKey:true
  },
  date:{
    type:Sequelize.DATE,
    allowNull:false
  },
  memo:{
    type:Sequelize.TEXT
  },
  status:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  progress:{
    type:Sequelize.INTEGER
  },
  reason:{
    type:Sequelize.TEXT
  }
},{
  freezeTableName:true, 
  indexes:[
    {
      fields:['mission_id']
    }
  ]
}
)

module.exports=MissionLog;
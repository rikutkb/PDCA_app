'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const SolutionLog=loader.database.define('solution_logs',{
  solution_id:{
    type:Sequelize.UUID,
    primaryKey:true,
    allowNull:false
  },
  date:{
    type:Sequelize.DATE,
    primaryKey:true,
    allowNull:false
  },
  time:{
    type:Sequelize.TIME
  },
  memo:{
    type:Sequelize.TEXT
  },
  done:{
    type:Sequelize.BOOLEAN,
    allowNull:false
  }
},{
  freezeTableName:true, 
  indexes:[
    {
      fields:['solution_id']
    }
  ]
}
)

module.exports=SolutionLog;
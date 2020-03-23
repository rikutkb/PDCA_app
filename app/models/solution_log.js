'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const SolutionLog=loader.database.define('solution_logs',{
  solution_id:{
    type:Sequelize.UUIDV4,
    primaryKey:true,
    allowNull:false
  },
  date:{
    type:Sequelize.DATE,
    primaryKey:true,
    allowNull:false
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
'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const SolutionLog=loader.database.define('solution_logs',{
  solution_id:{
    type:Sequelize.UUID,
    primaryKey:true,
    allowNull:false
  },
  index:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  date:{
    type:Sequelize.DATE,
    allowNull:false
  },
  time:{
    type:Sequelize.INTEGER
  },
  memo:{
    type:Sequelize.TEXT
  },
  done:{
    type:Sequelize.BOOLEAN,
    allowNull:false
  },
  postponed:{
    type:Sequelize.DATE
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
      fields:['solution_id']
    }
  ]
}
)

module.exports=SolutionLog;
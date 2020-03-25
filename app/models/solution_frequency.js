'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const SolutionFrequency=loader.database.define('solution_frequencies',{
  solution_id:{
    type:Sequelize.UUID,
    primaryKey:true,
    allowNull:false
  },
  Day:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull:false
  },
  do:{
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

module.exports=SolutionFrequency;
'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const Goal=loader.database.define('goals',{
  goal_id:{
    type:Sequelize.UUID,
    primaryKey:true,
    allowNull:false
  },
  goal_name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  period:{
    type:Sequelize.STRING,
    allowNull:false
  },
  current:{
    type:Sequelize.STRING,
    allowNull:false
  },
  gap:{
    type:Sequelize.STRING,
    allowNull:false
  },
  unit:{
    type:Sequelize.STRING,
    allowNull:true
  },
  done:{
    type:Sequelize.BOOLEAN
  },
  updatedAt:{
    type:Sequelize.DATE,
    allowNull:false
  }
},{
  freezeTableName:true,
}
)

module.exports=Goal;
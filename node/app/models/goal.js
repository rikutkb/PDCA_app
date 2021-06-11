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
  startDate:{
    type:Sequelize.DATE
  },
  endDate:{
    type:Sequelize.DATE
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
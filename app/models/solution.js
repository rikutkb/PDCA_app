'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const Solution=loader.database.define('solutions',{
  solution_id:{
    type:Sequelize.UUID,
    primaryKey:true,
    allowNull:false
  },
  solution_name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  mission_id:{
    type:Sequelize.UUID,
    allowNull:false
  },
  impact:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  easy:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  time:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  startDate:{
    type:Sequelize.DATE
  },
  endDate:{
    type:Sequelize.DATE
  },
  do:{
    type:Sequelize.BOOLEAN,
    allowNull:false
  },
  done:{
    type:Sequelize.BOOLEAN
  },
  duration:{
    type:Sequelize.INTEGER
  },
  week_bit:{
    type:Sequelize.INTEGER
  },
  updatedAt:{
    type:Sequelize.DATE,
    allowNull:false
  }
},{
  freezeTableName:true
}
)

module.exports=Solution;
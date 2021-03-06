'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const Mission=loader.database.define('missions',{
  mission_id:{
    type:Sequelize.UUID,
    primaryKey:true,
    allowNull:false
  },
  mission_name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  goal_id:{
    type:Sequelize.UUID,
    allowNull:false
  },
  startDate:{
    type:Sequelize.DATE
  },
  endDate:{
    type:Sequelize.DATE
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
  do:{
    type:Sequelize.BOOLEAN,
    allowNull:false
  },
  done:{
    type:Sequelize.BOOLEAN
  },
  updatedAt:{
    type:Sequelize.DATE,
    allowNull:false
  }
},{
  freezeTableName:true
}
)

module.exports=Mission;
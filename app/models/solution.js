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
  do:{
    type:Sequelize.BOOLEAN,
    allowNull:false
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
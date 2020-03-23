'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const Goal=loader.database.define('goals',{
  goal_id:{
    type:Sequelize.UUIDV4,
    primaryKey:true,
    allowNull:false
  },
  goal_name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  period:{
    type:Sequelize.DATE,
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
  createdBy:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  updatedAt:{
    type:Sequelize.DATE,
    allowNull:false
  }
},{
  freezeTableName:true,
  timestamps:false,
  indexes:[
    {
      fields:['createdBy']
    }
  ]
}
)

module.exports=Goal;
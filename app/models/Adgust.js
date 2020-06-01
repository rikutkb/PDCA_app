'use strict';

const loader=require('./sequelize-loader');
const Sequelize=loader.Sequelize;

const Adgust=loader.database.define('Adgust',{
  goal_id:{
    type:Sequelize.UUID,
    primaryKey:true,
    allowNull:false
  },
  indexes:{
    type:Sequelize.INTEGER,
    primaryKey:true
  },
  date:{
    type:Sequelize.DATE,
    allowNull:false
  },
  memo:{
    type:Sequelize.TEXT
  },
  status:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
},{
  freezeTableName:true, 
  indexes:[
    {
      fields:['goal_id']
    }
  ]
}
)

module.exports=Adgust;
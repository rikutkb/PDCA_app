'use strict';
const Sequelize=require('sequelize');
require('dotenv').config();

const sequelize=new Sequelize(
  process.env.POSTGRES_PATH,
  {
    operatorsAliases: false
  }
)
module.exports={
  database:sequelize,
  Sequelize:Sequelize
};
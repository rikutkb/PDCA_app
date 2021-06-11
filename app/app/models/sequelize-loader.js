'use strict';
const Sequelize=require('sequelize');
require('dotenv').config();

const sequelize=new Sequelize(
  "postgres://postgres:@database:5432/mydatabase",
  {
    operatorsAliases: false
  }
)
module.exports={
  database:sequelize,
  Sequelize:Sequelize
};
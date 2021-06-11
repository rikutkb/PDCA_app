const bcrypt=require('bcrypt')
var User=require('../../models/user')
var saltRounds=10;

class PassBcrypt{
  salt;
  constructor(){
  }
  static initialize(){
    this.salt=bcrypt.genSaltSync(saltRounds);
  }


  
  

}

module.exports.PassBcrypt=PassBcrypt
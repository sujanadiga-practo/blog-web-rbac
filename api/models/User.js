/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require("bcrypt");
module.exports = {

  attributes: {
  	username : {
  		type : "string",
  		required : true,
      unique : true
  	},
  	email : {
  		type : "email",
  		required : true,
  		unique : true
  	},
  	password : {
  		type : "string",
  		required : true,
  		minLength : 6,
  		maxLength : 13
  	},
  	toJSON : function(){
  		var out = this.toObject();
  		delete out.password;
  		return out;
  	},
  },
  beforeCreate : function (user, callback) {
	bcrypt.genSalt(10, function(err, salt){
		console.log("encrypting")
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err){
				callback(err);
			}
			else{
				user.password = hash;
				callback();
			}
		});
	});
  },
  tableName : "users"
};


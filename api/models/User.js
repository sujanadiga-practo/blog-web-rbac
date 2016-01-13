/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require("bcrypt");
var moment = require("moment");
module.exports = {
  types : {
    password : function(pwd){
      return pwd === this.conf_password;
    },
    single_word : function(username){
      return username.indexOf(' ') < 0;
    }
  },
  attributes: {
  	name : {
      type : "string",
      required : true,
    },
    username : {
  		type : "string",
  		required : true,
      unique : true,
      single_word : true
  	},
  	email : {
  		type : "email",
  		required : true,
  		unique : true
  	},
  	password : {
  		type : "string",
  		required : true,
      password : true
  	},
    conf_password : {
      type : "string",
      required : true,
    },  
  	toJSON : function(){
  		var out = this.toObject();
  		delete out.password;
  		return out;
  	},
    formatedTime : function () {
      return moment(this.createdAt).format("MMMM Do YYYY");
    },
    relativeTime : function () {
      return moment(this.createdAt).fromNow();
    }
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
  beforeUpdate : function (user, callback) {
    if(!user.password) callback();
    else{
      bcrypt.genSalt(10, function(err, salt){
        console.log("Update (encrypting)")
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
    }
  },
  tableName : "users"
};


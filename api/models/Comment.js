/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	message : {
  		type : "text",
  		required : true
  	},
  	blog : {
  		model : "blog",
  		required : true
  	},
  	user : {
  		model : "user",
  		required : true
  	}
  },
  tableName : "comments"
};


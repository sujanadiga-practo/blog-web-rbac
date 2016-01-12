/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var moment = require("moment");
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
  	},
    relativeTime : function () {
      return moment(this.createdAt).fromNow();
    },
    formatedTime : function () {
      return moment(this.createdAt).format("MMMM Do YYYY");
    }
  },
  tableName : "comments"
};


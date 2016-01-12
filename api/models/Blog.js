/**
* Blog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var moment = require("moment");
module.exports = {

  attributes: {
  	title : {
  		type : "string",
  		required : true
  	},
  	content : {
  		type : "text",
      required : true
  	},
    author : {
      model : "user",
      required : true
    },
    formatedTime : function () {
      return moment(this.createdAt).format("MMMM Do YYYY");
    },
    relativeTime : function () {
      return moment(this.createdAt).fromNow();
    }

  },
  tableName : 'blogs'
};


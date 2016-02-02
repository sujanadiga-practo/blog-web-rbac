/**
 * CommentController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require("superagent");

module.exports = {
	index : function (req, res) {	
		request
			.get(sails.config.api_server + "/tags")
			.set("Authorization", "Bearer " + cookieHandler.getCookie(req, res, "token"))
			.end(function (err, response) {
				if(!err){
					var data = JSON.parse(response.text);
					if(req.xhr){
						res.json(data);
					}
					else if(data.status == "success"){
						return responseHandler.redirectWithMessage(req, res, "You can not list tags.", "warning", "/");
					}
					else{
						return responseHandler.redirectWithMessage(req, res, data.message, "danger", "/");
					}
				}
				else if(err.status == 401){
					return responseHandler.sendSessionExpiredMessage(req, res);
				}
			});
	},
	listBlogs : function (req, res) {	
		request
			.get(sails.config.api_server + "/tags/" + req.param("id"))
			.set("Authorization", "Bearer " + cookieHandler.getCookie(req, res, "token"))
			.end(function (err, response) {
				if(!err){
					var data = JSON.parse(response.text);
					if(data.status == "success"){
						res.view("tag/show", {
							tag : data.payload.tag,
							blogs : data.payload.tag.blogs
						});
					}
					else{
						return responseHandler.redirectWithMessage(req, res, data.message, "danger", req.get("referer") || "/");
					}
				}
				else if(err.status == 401){
					return responseHandler.sendSessionExpiredMessage(req, res);
				}
			});
	},
	create : function (req, res) {
		request
			.post(sails.config.api_server + "/tags")
			.send(req.body)
			.set("Authorization", "Bearer " + cookieHandler.getCookie(req, res, "token"))
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);

					if(data.status == "success"){
						return responseHandler.redirectWithMessage(req, res, data.message, "success", req.get("referer") || "/");
					}
					else{
						return responseHandler.redirectWithMessage(req, res, data.message, "danger", req.get("referer") || "/");
					}
				}
				else if(err.status == 401){
					return responseHandler.sendSessionExpiredMessage(req, res);
				}
			}); 		
	},
	update : function(req,res){

	},
	delete : function(req, res){
		request
			.delete(sails.config.api_server + "/tags/" + req.param("id"))
			.set("Authorization", "Bearer " + cookieHandler.getCookie(req, res, "token"))
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);
					req.flash("message", data.message);
					if(data.status == "success"){
						req.flash("type", "success");
					}
					else{
						req.flash("type", "danger");
					}
					return res.json(data);
				}
				else if(err.status == 401){
					return responseHandler.sendSessionExpiredMessageXHR(req, res);
				}
			}); 	
	},
	new : function (req, res){
		res.view();
	}
};


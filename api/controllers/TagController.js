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
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response) {
				if(!err){
					var data = JSON.parse(response.text);
					if(req.xhr){
						res.json(data);
					}
					else if(data.status == "success"){
						res.view(data.payload);
					}
					else{
						req.flash("message", data.message);
						req.flash("type", "danger");
						res.redirect("/");
					}
				}
				else if(err.status == 401){
					return responseHandler.sendSessionExpiredMessage(req, res);
				}
			});
	},
	find : function (req, res) {	
		request
			.get(sails.config.api_server + "/tags/" + req.param("id"))
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response) {
				if(!err){
					var data = JSON.parse(response.text);
					if(data.status == "success"){
						res.view(data.payload);
					}
					else{
						req.flash("message", data.message);
						req.flash("type", "danger");
						res.redirect("/");
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
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);

					if(data.status == "success"){
						req.flash("message", data.message);
						req.flash("type", "success");
						res.redirect("/");
					}
					else{
						req.flash("info", data.message);
						req.flash("type", "danger");
						res.redirect("/");
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
			.set("Authorization", "Bearer " + req.cookies.token)
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
					res.clearCookie("token");
					res.clearCookie("userId");
					res.clearCookie("userRole");
					res.clearCookie("tagId");
					
					req.flash("message", "Session expired. Please login again.");
					req.flash("type", "warning");
					return res.json({
						status : "error",
						statusCode : 401,
						message : "Session expired."
					});
					
					//res.redirect("/login");
				}
			}); 	
	},
	new : function (req, res){
		res.view();
	}
};


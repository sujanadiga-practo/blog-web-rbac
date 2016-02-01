/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require("superagent");

module.exports = {
	index : function (req, res) {	
		request
			.get(sails.config.api_server + "/comments")
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response) {
				if(!err){
					var data = JSON.parse(response.text);
					if(data.status == "success"){
						res.view(data.payload);
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
	find : function (req, res) {	
		request
			.get(sails.config.api_server + "/comments/" + req.param("id"))
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response) {
				if(!err){
					var data = JSON.parse(response.text);
					if(data.status == "success"){
						res.view(data.payload);
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
			.post(sails.config.api_server + "/comments")
			.send(req.body)
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);

					if(data.status == "success"){
						return responseHandler.redirectWithMessage(req, res, data.message, "success", "/blogs/"  + req.body.blog);
					}
					else{
						return responseHandler.redirectWithMessage(req, res, data.message, "danger", "/blogs/"  + req.body.blog);
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
			.delete(sails.config.api_server + "/comments/" + req.param("id"))
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
					return responseHandler.sendSessionExpiredMessageXHR(req, res);
				}
			}); 	
	}
};


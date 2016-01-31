/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require("superagent");
module.exports = {
	index : function (req, res){
		sails.log(req.cookies);
		request
			.get(sails.config.api_server + "/blogs")
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
	new : function (req, res){
		request
			.get(sails.config.api_server + "/tags")
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
	create : function(req, res){
		
		request
			.post(sails.config.api_server + "/blogs")
			.send(req.body)
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);
					if(data.status == "success"){
						req.flash("message", data.message);
						req.flash("type", "success");
						res.redirect("/blogs/" + data.payload.blog.id);
					}
					else{
						req.flash("message", data.message);
						req.flash("type", "danger");
						res.redirect("/blogs/new");
					}
				}
				else if(err.status == 401){
					return responseHandler.sendSessionExpiredMessage(req, res);
				}
			});

	},
	show : function (req, res) {
		var id = req.param('id');
		request
			.get(sails.config.api_server + "/blogs/" + id)
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
	update : function(req, res){
		console.log("Updating blog");
		
		request
			.put(sails.config.api_server + "/blogs/" + req.param("id"))
			.send(req.body)
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

				}
			});
	},
	edit : function(req, res){
		var id = req.param('id');
		request
			.get(sails.config.api_server + "/blogs/" + id)
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response) {
				if(!err){
					var data = JSON.parse(response.text);
					if(data.status == "success"){
						var blog = data.payload.blog;
						blog.content = blog.content.replace(/<br \/?>/gi, "\r\n");
						
						request
							.get(sails.config.api_server + "/tags")
							.set("Authorization", "Bearer " + req.cookies.token)
							.end(function (err, response) {
								if(!err){
									var data = JSON.parse(response.text);
									if(data.status == "success"){

										var tags = data.payload.tags;
										for(tag in tags){

										}
										console.log(tags)
										console.log(blog.tags)
										res.view({
											blog : blog,
											tags : data.payload.tags
										});
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
					}
				}
				else if(err.status == 401){
					return responseHandler.sendSessionExpiredMessage(req, res);
				}
			});
	},
	delete : function(req, res){
		request
			.delete(sails.config.api_server + "/blogs/" + req.param("id"))
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
				}
			});			
	}
};


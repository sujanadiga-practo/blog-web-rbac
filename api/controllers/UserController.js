/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require("bcrypt");
var request = require("superagent");
module.exports = {
	login : function (req, res) {
		request
			.post(sails.config.api_server + "/login")
			.send(req.body)
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);

					if(data.status == "success"){
						res.cookie("token", data.payload.token, {
							httpOnly : true
						});
						res.cookie("userId", data.payload.user.id, {
							httpOnly : true
						});
						res.cookie("userRole", data.payload.user.role, {
							httpOnly : true
						});
						if(data.payload.user.role == "tagModerator"){
							res.cookie("tagId", data.payload.user.tagMaintained, {
								httpOnly : true
							});
						}
						req.flash("message", data.message);
						req.flash("type", "success");
						res.redirect("/");
					}
					else{
						req.flash("info", data.message);
						req.flash("type", "danger");
						res.redirect("/login");
					}
				}
			});
	},
	logout : function (req, res) {
		res.clearCookie("token");
		res.clearCookie("userId");
		res.clearCookie("userRole");
		res.clearCookie("tagId");
		
		req.flash("message", "You have successfully logged out.");
		req.flash("type", "success");
		res.redirect("/");
	},
	create : function (req, res) {
		//.set("Authorization", "Bearer " + req.cookies.token)
		console.log(req.body)
		request
			.post(sails.config.api_server + "/users")
			.send(req.body)
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);

					if(data.status == "success"){
						res.cookie("token", data.payload.token, {
							httpOnly : true
						});
						res.cookie("userId", data.payload.user.id,{
							httpOnly : true
						});
						res.cookie("userRole", data.payload.user.role, {
							httpOnly : true
						});
						if(data.payload.user.role == "tagModerator"){
							res.cookie("tagId", data.payload.user.tagMaintained, {
								httpOnly : true
							});
						}
						req.flash("message", data.message);
						req.flash("type", "success");
						res.redirect("/");
					}
					else{
						req.flash("info", data.message);
						req.flash("type", "danger");
						res.redirect("/signup");
					}
				}
			});
	},
	index : function(req, res){
		request
			.get(sails.config.api_server + "/users")
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);

					if(data.status == "success"){
						res.view({
							users : data.payload.users
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
	},
	delete : function(req, res){
		request
			.delete(sails.config.api_server + "/users/" + req.param("id"))
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
	changePassword : function(req, res){
		request
			.get(sails.config.api_server + "/users/" + req.param("id"))
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);

					if(data.status == "success"){
						res.view("user/changePassword", {
							user : data.payload.user
						});
					}
					else{
						req.flash("message", data.message);
						req.flash("type", "danger");
						res.redirect(req.get("referer"));
					}
				}
				else if(err.status == 401){
					return responseHandler.sendSessionExpiredMessage(req, res);
				}
			});
	},
	update : function(req, res){
		console.log("In client side update")
		request
			.put(sails.config.api_server + "/users/" + req.param("id"))
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
	edit : function (req, res){
		request
			.get(sails.config.api_server + "/users/" + req.param("id"))
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);

					if(data.status == "success"){
						console.log(data.payload.user)
						res.view({
							user : data.payload.user
						});
					}
					else{
						req.flash("message", data.message);
						req.flash("type", "danger");
						res.redirect(req.get("referer"));
					}
				}
				else if(err.status == 401){
					return responseHandler.sendSessionExpiredMessage(req, res);
				}
			});
	},
	show : function (req, res) {
		request
			.get(sails.config.api_server + "/users/" + req.param("id"))
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);

					if(data.status == "success"){
						res.view("user/profile", {
							user : data.payload.user,
							blogs : data.payload.blogs
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
	},
	router : function (req, res) {
		res.view(req.url.slice(1));
	},
	listBlogs : function (req, res) {
		request
			.get(sails.config.api_server + "/users/" + req.param("id"))
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);

					if(data.status == "success"){
						res.view("user/blogs", {
							user : data.payload.user,
							blogs : data.payload.blogs
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
};


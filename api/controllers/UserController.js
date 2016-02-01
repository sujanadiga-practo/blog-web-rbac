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
						return responseHandler.redirectWithMessage(req, res, data.message, "success", "/");
					}
					else{
						req.flash("info", data.message);
						req.flash("type", "danger");
						res.redirect("/login");
						// return responseHandler.redirectWithMessage(req, res, data.message, "danger", "/login");
					}
				}
			});
	},
	logout : function (req, res) {
		
		responseHandler.clearAllCookies(res);
		return responseHandler.redirectWithMessage(req, res, "You have successfully logged out.", "success", "/login");
	},
	create : function (req, res) {
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
						return responseHandler.redirectWithMessage(req, res, data.message, "success", "/");
					}
					else{
						req.flash("info", data.message);
						req.flash("type", "danger");
						res.redirect("/signup");
						// return responseHandler.redirectWithMessage(req, res, data.message, "danger", "/signup");
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
						return responseHandler.redirectWithMessage(req, res, data.message, "danger", req.get("referer") || "/");
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
					return responseHandler.sendSessionExpiredMessageXHR(req, res);
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
						return responseHandler.redirectWithMessage(req, res, data.message, "danger", req.get("referer") || "/");
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
					return responseHandler.sendSessionExpiredMessageXHR(req, res);
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
						return responseHandler.redirectWithMessage(req, res, data.message, "danger", req.get("referer") || "/");
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
						return responseHandler.redirectWithMessage(req, res, data.message, "danger", req.get("referer") || "/");
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
						return responseHandler.redirectWithMessage(req, res, data.message, "danger", req.get("referer") || "/");
					}
				}
				else if(err.status == 401){
					return responseHandler.sendSessionExpiredMessage(req, res);
				}
			});
	}
};


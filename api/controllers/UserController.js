/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require("bcrypt");
module.exports = {
	create : function (req, res) {
		
		User.create(req.body).exec(function(err, user){
			if (err){
				if(err.code && err.code == 'E_VALIDATION'){
					if(err.invalidAttributes){
						var attrib =  Object.keys(err.invalidAttributes)[0];
						var msg = '<em>' + attrib + '</em> already exists.';
					}
				}
				else{
					var msg = '<em>Some error occurred.</em>';
				}
				res.view('user/signup', {
					info : msg
				});
			}
			else{
				req.logIn(user, function(err) {
	                if (err) res.send(err);

                    console.log("User registration successful..");
                     
                    req.flash("message", "You have successfully registered. Welcome " + req.user.name);
                    req.flash("type", "success");
                    res.redirect("/");
	            });		
			}
		});
	},
	index : function(req, res){
		User.find().exec(function(err, users){
			if(err) res.send(err);
			res.view({
				users : users
			});
		});
	},
	delete : function(req, res){

	},
	changePassword : function(req, res){
		User.find({id : req.param('id')}).exec(function(err, users){
			if(!err && users.length > 0){
				var user = users[0];
				res.view("user/changePassword", {
					user : user
				});
			}
		});
	},
	update : function(req, res){
		console.log("Updating user");
		var params = req.body;
		criteria = {
			id : params.id
		};
		console.log(params)
		if(params.old_password){
			User.findOne({id: params.id}).exec(function(err, user){
				console.log(user)
				bcrypt.compare(params.old_password, user.password, function(err, out){
					console.log("Compare : " + out)
					if(!out){
						res.send({
							status : "error",
							data : null,
							message : "Authentication failure."
						});
						return;
					}
				});
			});
			
		}
		User.update(criteria, params).exec(function(err, user){
			console.log(user)
			if(err){
				console.log(err)
				var message = "Some error occurred.";
				if(err.code && err.code == "E_VALIDATION"){
					message = "Validation error."
				}
				res.send({
					status : "error",
					data : null,
					message : message
				});
				return;
			}
			else{
				res.send({
					status : "success",
					data : null,
					message : "Successfully updated user details"
				})
			}
		});
	},
	edit : function (req, res){
		User.find({id : req.param('id')}).exec(function(err, users){
			if(!err && users.length > 0){
				var user = users[0];
				res.view({
					user : user
				});
			}
		});
	},
	show : function (req, res) {
		User.find({ id : req.param("id") }).exec(function (err, users){
			if(!err && users.length > 0){
				var user = users[0];
				Blog.find({ author : user.id }).exec(function (err, blogs){
					res.view("user/profile", {
						user : user,
						blogs : blogs
					});
				}); 
			}
		});
	},
	router : function (req, res) {
		if(req.user){
			res.redirect("/");
		}		
		else{
			res.view(req.url.slice(1));
		}
	},
	listBlogs : function (req, res) {

		var id = req.param('id')
		Blog.find({author : id}).populate("author").exec(function (err, blogs){
			res.view("user/blogs", {
				blogs : blogs,
			});
		});
	}
};


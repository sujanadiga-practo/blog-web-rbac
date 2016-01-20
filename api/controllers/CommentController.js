/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require("superagent");

module.exports = {
	create : function (req, res) {
		request
			.post(sails.config.api_server + "/comments")
			.send(req.body)
			.set("Authorization", "Bearer " + req.cookies.token)
			.end(function (err, response){
				if(!err){
					data = JSON.parse(response.text);

					if(data.status == "success"){
						req.flash("message", data.message);
						req.flash("type", "success");
						res.redirect("/blogs/" + req.body.blog);
					}
					else{
						req.flash("info", data.message);
						req.flash("type", "danger");
						res.redirect("/blogs/" + req.body.blog);
					}
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
					res.clearCookie("token");
					res.clearCookie("userId");
					
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
	}
};


/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function (req, res){
		Blog.find().populate("author").exec(function (err, blogs){
			res.view({
				blogs : blogs
			});
		});
	},
	new : function (req, res){
		res.view();
	},
	create : function(req, res){
		var data = req.body;
		data.content = data.content.replace(/\r?\n/g, "<br />");
		Blog.create(data).exec(function(err, blog){
			if(!err){
				req.flash("message", "Blog posted successfully.");
				req.flash("type", "success");
				res.redirect("blog/" + blog.id);
			}
		});
	},
	show : function (req, res) {
		var id = req.param('id');
		Blog.find({id : id}).populate("author").exec(function (err, blogs){
			Comment.find({blog: blogs[0].id}).populate("user").exec(function (err, comments) {
				res.view({
					blog : blogs[0],
					comments : comments
				});
			})
		});
	},
	update : function(req, res){
		console.log("Updating blog");
		var params = req.body;
		params.content = params.content.replace(/\r?\n/g, "<br />");
		Blog.update({id : params.id, author : params.author}, params).exec(function(err, blog){
			if(err){
				res.send({
					status : "error",
					data : null,
					message : err
				});
			}
			else{
				res.send({
					status : "success",
					data : null,
					message : "Successfully updated blog"
				})
			}
		});
	},
	edit : function(req, res){
		Blog.find({id : req.param('id')}).exec(function(err, blogs){
			if(!err && blogs.length > 0){
				var blog = blogs[0];
				blog.content = blog.content.replace(/<br \/?>/gi, "\r\n");

				res.view({
					blog : blog
				});
			}
		});
	},
	delete : function(req, res){
		var id = req.param('id');
		Blog.destroy({id : id}).exec(function(err, blogs){
			if(err){
				res.send({
					status : "error",
					data : null,
					message : err
				});
			}
			else{
				console.log("Blog deleted")
				console.log(blogs)
				Comment.destroy({blog: blogs[0].id }).exec(function(err, comments){
					console.log(comments)
					res.send({
						status : "success",
						data : null,
						message : "Successfully deleted blog"
					})
				});
				
			}
		});
	}
};


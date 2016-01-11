/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function (req, res){
		Blog.find().populate("author").exec(function (err, blogs){
			console.log(req.get("referer"))
			var from = req.flash("from");
			console.log(from)
			if(req.user && req.get('referer') == req.baseUrl + "/user/login"){
				var msg = "Welcome " + req.user.name;
			}
			else if(req.user && req.get('referer') == req.baseUrl + "/user/signup"){
				var msg = 'You have successfully registered. Welcome ' + req.user.name ;
			}
			else if( from && from[0] == "logout" ){
				var msg = 'You have successfully Logged out. Bye';
			}
			res.view({
				blogs : blogs,
				message : msg
			});
		});
	},
	write : function (req, res){
		console.log("Writing a new blog");
		res.view();
	},
	create : function(req, res){
		console.log("Creating a new blog")
		console.log(req)
		Blog.create(req.body).exec(function(err, blog){
			if(!err){
				res.redirect("blog/view/" + blog.id);
			}
		});
	},
	findOne : function (req, res) {

		var id = req.param('id')
		console.log(id)
		Blog.find({author : id}).populate("author").exec(function (err, blogs){
			console.log(blogs)
			res.view("blog/my", {
				blogs : blogs,
			});
		});
	},
	view : function (req, res) {
		var id = req.param('id');
		console.log(id)
		Blog.find({id : id}).populate("author").exec(function (err, blogs){
			console.log(blogs)
			Comment.find({blog: blogs[0].id}).populate("user").exec(function (err, comments) {
				console.log(comments)
				res.view({
					blog : blogs[0],
					comments : comments
				});
			})
		});
	}
	
	
};


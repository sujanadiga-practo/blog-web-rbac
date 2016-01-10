/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function (req, res){
		Blog.find().populate("author").exec(function (err, blogs){
			console.log(blogs)
			if(req.user && req.get('referer') == req.baseUrl + "/user/login"){
				var msg = "Welcome " + req.user.username;
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
				res.json(blog);
			}
		});
	},
	findOne : function (req, res) {
		var id = req.url.split("/")[2]
		console.log(id)
		Blog.find({id : id}).populate("author").exec(function (err, blogs){
			console.log(blogs)
			res.view("blog/my", {
				blogs : blogs,
			});
		});
				
	}
	
	
};


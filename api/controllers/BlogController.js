/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function (req, res){
		Blog.find(function (err, blogs){
			console.log(blogs)
			console.log(req.session)
			res.view({ blogs : blogs });
		});
	},
	write : function (req, res){
		console.log("Writing a new blog");
		res.view();
	},
	create : function(req, res){
		Blog.create(req.body).exec(function(err, blog){
			if(!err){
				res.json(blog);
			}
		});
	}
	
	
};


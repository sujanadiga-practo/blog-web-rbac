/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function (req, res) {
		console.log(req.body)
		if(req.body.username.indexOf(' ') >= 0){
			res.view('user/signup', {
				message : '<em>Username can not contain whitespaces.</em>'
			});
		}
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
				console.log(req)
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
			res.view({
				users : users
			});
		});
	},
	delete : function(req, res){

	},
	update : function(req, res){

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
			console.log(req.url)
			req.flash("referer", req.get("referer"))
			console.log(req)
			res.view(req.url.slice(1));
		}
	},
	listBlogs : function (req, res) {

		var id = req.param('id')
		console.log(id)
		Blog.find({author : id}).populate("author").exec(function (err, blogs){
			console.log(blogs)
			res.view("user/blogs", {
				blogs : blogs,
			});
		});
	}
};


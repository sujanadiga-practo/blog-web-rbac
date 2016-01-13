module.exports = function(req, res, next){

	Blog.find({ id : req.param("id") }).exec(function(err, blogs){
		if(blogs.length > 0 && blogs[0].author == req.user.id){
			return next();
		}
		else{
			req.flash("message", "You don't have permissions to do this action.");
			req.flash("type", "warning");

			return res.redirect("/");
		}
	})

}
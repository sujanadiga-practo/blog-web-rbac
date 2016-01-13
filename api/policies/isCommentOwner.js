module.exports = function(req, res, next){
	Comment.find({ id : req.param("id") }).exec(function(err, comments){
		if(comments.length > 0 && comments[0].user == req.user.id){
			return next();
		}
		else{
			req.flash("message", "You don't have permissions to do this action.");
			req.flash("type", "warning");

			return res.redirect("/");
		}
	})

}
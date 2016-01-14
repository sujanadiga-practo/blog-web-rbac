module.exports = function(req, res, next){
	if(!req.isAuthenticated()){
		return next();
	}
	else{
		req.flash("message", "Please log out to do this action.");
		req.flash("type", "warning");
		
		return res.redirect("/");
	}
}
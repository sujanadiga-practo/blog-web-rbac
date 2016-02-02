module.exports = function(req, res, next){
	if(cookieHandler.getCookie(req, res, "userId")){
		return next();
	}
	else{
		req.flash("message", "You have to log in to do this action.");
		req.flash("type", "warning");
		return res.redirect("/login");
	}
}
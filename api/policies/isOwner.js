module.exports = function(req, res, next){
	if(cookieHandler.getCookie(req, res, "userRole") == "admin") return next();
	
	if(cookieHandler.getCookie(req, res, "userId") == req.param("id")){
		return next();
	}
	else{
		req.flash("message", "You don't have permissions to do this action.");
		req.flash("type", "warning");

		return res.redirect("/");
	}
}
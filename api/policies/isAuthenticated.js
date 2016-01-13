module.exports = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		var msg = "You have to log in to do this action.";
		return res.render("user/login", { 
			info : msg
		});
	}
}
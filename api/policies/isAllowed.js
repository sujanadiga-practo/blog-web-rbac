module.exports = function(req, res, next){
	var userId = req.cookies.userId;
	var role = req.cookies.userRole || "guest";

	var resource = req.path;
	var controller = req.options.controller;
	var action = req.options.action;
	
	console.log(userId, role, resource, controller, action)

	
	rbac.can(role, action, controller, function (err, allowed){
		console.log(err, allowed)
		if(allowed){
			return next();
		}
		req.flash("message", "You can not do this action.");
		req.flash("type", "warning");

		return res.redirect("/");
	});
}
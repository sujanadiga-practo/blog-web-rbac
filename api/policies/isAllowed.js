var request = require("superagent");
module.exports = function(req, res, next){
	var userId = req.cookies.userId;
	var role = req.cookies.userRole || "guest";

	var resource = req.path;
	var controller = req.options.controller;
	var action = req.options.action;
	
	console.log(userId, role, resource, controller, action)

	
	rbac.can(role, action, controller, function (err, allowed){
		
		if(allowed){
			return next();
		}
		else{
			res.forbidden();
		}
	});
}
var request = require("superagent");
module.exports = function(req, res, next){
	var userId = cookieHandler.getCookie(req, res, "userId");
	var role = cookieHandler.getCookie(req, res, "userRole") || "guest";

	var resource = req.path;
	var controller = req.options.controller;
	var action = req.options.action;
	
	console.log(userId, role, resource, controller, action)

	
	rbac.can(role, action, controller, function (err, allowed){
		
		if(allowed){
			// if(role == "tagModerator"){
			// 	if((action == "find" || action == "show") && (controller == "blog"))
			// 	{
			// 		if(req.param("id") == cookieHandler.getCookie(req, res, "tagId")){
			// 			return next();
			// 		}
			// 		else{
			// 			return res.forbidden();
			// 		}
			// 	}
			// }
			// else{
			// 	return next();
			// }
			return next();
		}
		else{
			res.forbidden();
		}
	});
}
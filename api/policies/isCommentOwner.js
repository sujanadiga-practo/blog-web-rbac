var request = require("superagent");

module.exports = function(req, res, next){
	var id = req.param('id');
	if(cookieHandler.getCookie(req, res, "userRole") == "admin" || cookieHandler.getCookie(req, res, "userRole") == "commentModerator") return next();
	
	request
		.get(sails.config.api_server + "/comments/" + id)
		.set("Authorization", "Bearer " + req.cookies.token)
		.end(function (err, response) {
			if(!err){
				var data = JSON.parse(response.text);
				if(data.status == "success"){
					if(data.payload.comment.user.id == cookieHandler.getCookie(req, res, "userId")){
						next();
					}
					else{
						req.flash("message", "You don't have permissions to do this action.");
						req.flash("type", "warning");

						return res.redirect("/");
					}
				}
				else{
					req.flash("message", "You don't have permissions to do this action.");
					req.flash("type", "warning");

					return res.redirect("/");
				}
			}
		});
}
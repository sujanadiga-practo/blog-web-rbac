module.exports = {
	sendSessionExpiredMessage : function (req, res) {
		console.log("Clearing cookies");

		this.clearAllCookies(res);
		
		req.flash("message", "Session expired. Please login again.");
		req.flash("type", "warning");
		res.redirect("/login");
	},
	redirectWithMessage : function (req, res, message, type, url) {
		req.flash("message", message);
		req.flash("type", type);
		res.redirect(url);
	},
	sendSessionExpiredMessageXHR : function (req, res) {
		// res.clearCookie("token");
		// res.clearCookie("userId");
		// res.clearCookie("userRole");
		// res.clearCookie("tagId");
		this.clearAllCookies(res);
		req.flash("message", "Session expired. Please login again.");
		req.flash("type", "warning");

		return res.json({
			status : "error",
			statusCode : 401,
			message : "Session expired."
		});

	},
	clearAllCookies : function (res) {
		res.clearCookie("token");
		res.clearCookie("userId");
		res.clearCookie("userRole");
		res.clearCookie("tagId");
	}
}
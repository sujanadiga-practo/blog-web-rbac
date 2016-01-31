module.exports = {
	sendSessionExpiredMessage : function (req, res) {
		console.log("Clearing cookies");

		res.clearCookie("token");
		res.clearCookie("userId");
		res.clearCookie("userRole");
		
		req.flash("message", "Session expired. Please login again.");
		req.flash("type", "warning");
		res.redirect("/login");
	}
}
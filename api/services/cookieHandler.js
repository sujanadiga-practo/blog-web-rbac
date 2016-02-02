module.exports = {
	getCookie : function (req, res, cookieName) {
		// return req.cookies[cookieName];
		return req.signedCookies[cookieName];
	}
}
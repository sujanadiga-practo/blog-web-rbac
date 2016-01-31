request = require("superagent");
module.exports = {
  get : function (url, authHeader, token, callback) {
    request
      .get(url)
      .set(authHeader, token)
      .end(callback);
  }
}
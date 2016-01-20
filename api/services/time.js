var moment = require("moment");
module.exports = {
	formatedTime : function (rawTime) {
      return moment(rawTime).format("MMMM Do YYYY");
    },
    relativeTime : function (rawTime) {
      return moment(rawTime).fromNow();
    }
}
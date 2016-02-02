request = require("superagent");
module.exports = {
  show : function (req, res) {
    if(!cookieHandler.getCookie(req, res, "userId") || cookieHandler.getCookie(req, res, "userRole") == "user"){
      return res.view("index");
    }
    else if(cookieHandler.getCookie(req, res, "userRole") == "tagModerator"){
      superagentRequest.get(sails.config.api_server + "/tags/" + cookieHandler.getCookie(req, res, "tagId"),
        "Authorization", "Bearer " + cookieHandler.getCookie(req, res, "token"),
        function (err, response) {
          if(!err){
            var data = JSON.parse(response.text);
            if(data.status == "success"){
              return res.view("dashboard/show", {
                tag : data.payload.tag,
                blogs : data.payload.tag.blogs
              });
            }
          }
          else if(err.status == 401){
            return responseHandler.sendSessionExpiredMessage(req, res);
          }
        });
    }
    else{
      superagentRequest.get(sails.config.api_server + "/users",
        "Authorization", "Bearer " + cookieHandler.getCookie(req, res, "token"),
        function (err, response) {
          if(!err){
            var data = JSON.parse(response.text);
            if(data.status == "success"){
              var users = data.payload.users; 
            }
            superagentRequest.get(sails.config.api_server + "/blogs",
              "Authorization", "Bearer " + cookieHandler.getCookie(req, res, "token"),
              function (err, response) {
                if(!err){
                  var data = JSON.parse(response.text);
                  if(data.status == "success"){
                    var blogs = data.payload.blogs;
                  }
                  superagentRequest.get(sails.config.api_server + "/tags",
                    "Authorization", "Bearer " + cookieHandler.getCookie(req, res, "token"),
                    function (err, response) {
                      if(!err){
                        var data = JSON.parse(response.text);
                        if(data.status == "success"){
                          var tags = data.payload.tags;
                        }
                        superagentRequest.get(sails.config.api_server + "/comments",
                          "Authorization", "Bearer " + cookieHandler.getCookie(req, res, "token"),
                          function (err, response) {
                            if(!err){
                              var data = JSON.parse(response.text);
                              if(data.status == "success"){
                                var comments = data.payload.comments;
                              }
                              return res.view("dashboard/show", {
                                comments : comments,
                                tags : tags,
                                blogs : blogs,
                                users : users,
                              });
                            }
                            else if(err.status == 401){
                              return responseHandler.sendSessionExpiredMessage(req, res);
                            }
                          });
                      }
                      else if(err.status == 401){
                        return responseHandler.sendSessionExpiredMessage(req, res);
                      }
                    });
                  }
                  else if(err.status == 401){
                    return responseHandler.sendSessionExpiredMessage(req, res);
                  }
                });
          }
          else if(err.status == 401){
            return responseHandler.sendSessionExpiredMessage(req, res);
          }
        });
    }
  },
}
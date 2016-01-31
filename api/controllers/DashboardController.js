request = require("superagent");
module.exports = {
  show : function (req, res) {
    superagentRequest.get(sails.config.api_server + "/users",
      "Authorization", "Bearer " + req.cookies.token,
      function (err, response) {
        if(!err){
          var data = JSON.parse(response.text);
          if(data.status == "success"){
            var users = data.payload.users; 
          }
          superagentRequest.get(sails.config.api_server + "/blogs",
            "Authorization", "Bearer " + req.cookies.token,
            function (err, response) {
              if(!err){
                var data = JSON.parse(response.text);
                if(data.status == "success"){
                  var blogs = data.payload.blogs;
                }
                superagentRequest.get(sails.config.api_server + "/tags",
                  "Authorization", "Bearer " + req.cookies.token,
                  function (err, response) {
                    if(!err){
                      var data = JSON.parse(response.text);
                      if(data.status == "success"){
                        var tags = data.payload.tags;
                      }
                      superagentRequest.get(sails.config.api_server + "/comments",
                        "Authorization", "Bearer " + req.cookies.token,
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
  },
}
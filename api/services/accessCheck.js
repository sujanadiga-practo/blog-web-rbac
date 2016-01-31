var wait = require("wait.for");

module.exports = {
  getRole : function (req, res){
    var role = req.cookies.userRole || "guest";
    return role.charAt(0).toUpperCase() + role.slice(1);
  },
  can : function (action, controller, req, res, args){
    var userRole = req.cookies.userRole || "guest";
    var userId = req.cookies.userId;

    var can;
    async.series([
      function (){
        rbac.can(userRole, action, controller, function (err, allowed){
          can = allowed;
          if(userRole != "admin" && action == "edit" && controller == "user")
            can = false;
        });
      }
    ]);
    console.log(can)
    return can;
  }
}
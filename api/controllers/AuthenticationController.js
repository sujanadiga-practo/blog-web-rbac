/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing Authentications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	login : function(req, res){
		console.log("Authentication in progress")
		
	 	passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
            	var msg = "<em>Login failed, try again...</em>";
                res.view("user/login", {
                	message : msg
                });
            }
            else{
           		req.logIn(user, function(err) {
	                if (err) res.send(err);

                    console.log("Authentication successful..")
	                var msg = "Welcome " + user.username;
                    
                	res.view("blog/index", {
                		message : msg
                	});
	            });
 	
            }
           
        })(req, res);
    },
	logout : function(req, res){
        req.logout();
        res.redirect('/');
    }
};


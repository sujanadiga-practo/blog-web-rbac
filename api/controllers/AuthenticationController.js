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
            	var msg = "<em>" + info.message + "</em>";
                res.view("user/login", {
                	info : msg
                });
            }
            else{
           		req.logIn(user, function(err) {
	                if (err) res.send(err);

                    console.log("Authentication successful..")
                    req.flash("message", "Welcome " + req.user.name);
                    req.flash("type", "success");
                    console.log(req.get("referer"))
                    //res.redirect(req.get("referer"));    
                    res.redirect("/");
	            });
 	
            }
           
        })(req, res);
    },
	logout : function(req, res){
        if(req.user){
            req.logout();
            req.flash("message", "You have successfully Logged out. Bye");
            req.flash("type", "success");
            res.redirect(req.get('referer'));    
        }
        else{
            res.redirect('/');   
        }        
    }
};


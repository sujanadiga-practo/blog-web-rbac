/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function (req, res) {
		console.log(req.body)
		User.create(req.body).exec(function(err, user){
			if (err){
				if(err.code && err.code == 'E_VALIDATION'){
					if(err.invalidAttributes){
						var attrib =  Object.keys(err.invalidAttributes)[0];
						var msg = '<em>' + attrib + '</em> already exists.';
					}
				}
				else{
					var msg = '<em>' + 'Some error occurred.</em>';
				}
				res.view('user/signup', {
					message : msg
				});
			}
			else{
				req.logIn(user, function(err) {
	                if (err) res.send(err);

                    console.log("User registration successful..")
                    res.redirect("/");
	            });		
			}
		});
	},
	router : function (req, res) {
		if(req.user){
			res.redirect("/");
		}		
		else{
			console.log(req.url)
			res.render(req.url.slice(1));
		}
	}
};


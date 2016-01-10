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
						var msg = '<em>' + attrib + ' already exists.</em>';
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
				var msg = 'You have successfully registered. Please log in.';
				res.view('blog/index', {
					message : msg
				});			
			}
		});
	}
};


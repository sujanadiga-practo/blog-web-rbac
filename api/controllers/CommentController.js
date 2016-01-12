/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function (req, res) {
		Comment.create(req.body).exec(function (err, comment) {
			if(err) console.log(err);
			else{
				console.log(comment);
				res.redirect("blog/" + comment.blog);
			}

		})		 		
	},
	update : function(req,res){

	},
	delete : function(req, res){
		var id = req.param("id");
		Comment.destroy({id : id}).exec(function(err, comment){
			if(err){
				res.send({
					status : "error",
					data : null,
					message : err
				});
			}
			else{
				res.send({
					status : "success",
					data : null,
					message : "Successfully deleted comment"
				})
			}
		});
	}
};


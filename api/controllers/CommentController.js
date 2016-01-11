/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	post : function (req, res) {
		Comment.create(req.body).exec(function (err, comment) {
			if(err) console.log(err);
			else{
				console.log(comment);
				res.redirect("blog/view/" + comment.blog);
			}

		})		 		
	}
};


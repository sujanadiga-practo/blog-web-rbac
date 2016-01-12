signup = {
	checkUsername : function () {
		var username = $("#username");
		console.log(username)
		if(username.val() && username.val().indexOf(' ') >= 0){
			bootbox.alert("Username can not contain whitespaces", function(){
				username.val("");
			});
		}
	}
}
blog_obj = {
	confirmDelete : function (id) {
		console.log(id)
		bootbox.confirm("Do you want to delete this blog?", function(result){
			if(result){
				$.ajax({
					type : 'delete',
					url : '/blog/' + id,
					success : function(result, status){
						console.log(result)
						console.log(status)
						if(status == "success"){
							bootbox.alert("The blog deleted successfully.", function(){
								window.location = "/";
							});
						}
						else{
							bootbox.alert("Could not delete the blog, " + result.message, function(){
							});
						}
						
					},
					eroror : function(){
						bootbox.alert("Could not delete the blog, Some error occurred.", function(){
						});
					}

				});
			}
		});
	},
	update : function () {
		var title = $("#title").val();
		var content = $("#content").val();
		var id = $("#blog").val();
		var author = $("#author").val();

		$.ajax({
			type : 'put',
			url : '/blog/' + id,
			data : {
				id : id,
				author : author,
				title : title,
				content : content
			},
			success : function(result, status){
				if(status == "success"){
					bootbox.alert("The blog updated successfully.", function(){
						window.location = "/blog/" + id;
					});
				}
				else{
					bootbox.alert("Could not delete the blog, " + result.message, function(){
					});
				}
				
			},
			eroror : function(){
				bootbox.alert("Could not delete the blog, Some error occurred.", function(){
				});
			}

		});
	}
}
comment = {
	confirmDelete : function (bid, cid) {
		bootbox.confirm("Do you want to delete this comment?", function(result){
			if(result){
				$.ajax({
					type : 'delete',
					url : '/comment/' + cid,
					success : function(result, status){
						if(status == "success"){
							bootbox.alert("The comment deleted successfully.", function(){
								window.location = "/blog/" + bid;
							});
						}
						else{
							bootbox.alert("Could not delete the comment, " + result.message, function(){
							});
						}
						
					},
					eroror : function(){
						bootbox.alert("Could not delete the comment, Some error occurred.", function(){
						});
					}

				});
			}
		});

		
	}
}
signup = {

	checkUsername : function () {
		var username = $("#username");
		console.log(username)
		if(username.val() && username.val().indexOf(' ') >= 0){
			bootbox.alert("Username can not contain whitespaces", function(){
				username.val("");
				username.focus();
			});
		}
		else{
			/*
			$.ajax({
				type : 'get',
				url : '/user/usera'
			})
			*/
		}
	},
	checkPassword : function(){
		var pwd = $("#pwd");
		var conf_pwd = $("#conf_pwd");
		if (!(pwd.val() && conf_pwd.val() && pwd.val() == conf_pwd.val())){
			bootbox.alert("Passwords don't match", function(){
				pwd.val("");
				conf_pwd.val("");
				pwd.focus();
			});
		}

	},
	checkEmailAvalability : function(){

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
				if(result.status == "success"){
					bootbox.alert("Blog updated successfully.", function(){
						window.location = "/blog/" + id;
					});
				}
				else{
					bootbox.alert("Could not update the blog, " + result.message, function(){
					});
				}
				
			},
			eroror : function(){
				bootbox.alert("Could not update the blog, Some error occurred.", function(){
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
						if(result.status == "success"){
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
user = {
	update : function () {
		var name = $("#name").val();
		var id = $("#user_id").val();
		var email = $("#email").val();

		$.ajax({
			type : 'put',
			url : '/user/' + id,
			data : {
				id : id,
				name : name,
				email : email
			},
			success : function(result, status){
				if(result.status == "success"){
					console.log(result)
					bootbox.alert(result.message, function(){
						window.location = "/user/" + id;
					});
				}
				else{
					bootbox.alert("Could not update user details, " + result.message, function(){
					});
				}
				
			},
			eroror : function(){
				bootbox.alert("Could not update details, Some error occurred.", function(){
				});
			}

		});
	},
	changePassword : function () {
		var id = $("#user_id").val();
		var old_pwd = $("#old_pwd").val();
		var new_pwd = $("#new_pwd").val();
		var conf_pwd = $("#conf_pwd").val();
		console.log(id)
		$.ajax({
			type : 'put',
			url : '/user/' + id,
			data : {
				id : id,
				password : new_pwd,
				conf_password : conf_pwd,
				old_password : old_pwd
			},
			success : function(result, status){
				if(result.status == "success"){
					console.log(result)
					bootbox.alert(result.message, function(){
						window.location = "/user/" + id;
					});
				}
				else{
					bootbox.alert("Could not change your password, " + result.message, function(){
					});
				}
				
			},
			eroror : function(){
				bootbox.alert("Could not change your password, Some error occurred.", function(){
				});
			}

		});
	}

}
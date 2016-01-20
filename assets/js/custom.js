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
					url : '/blogs/' + id,
					success : function(data, textStatus){
						if(data.status == "success"){
							window.location = "/";
						}
						else if (data.status == "error" && data.statusCode == 401){
							window.location = "/login";
						}
						else if(data.status == "error"){
							window.location = "/blogs/" + id;
						}
					},
					eroror : function(xhr, textStatus, error){
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
			url : '/blogs/' + id,
			data : {
				id : id,
				author : author,
				title : title,
				content : content
			},
			success : function(data, textStatus){
				if(data.status == "success"){
					window.location = "/blogs/" + id;
				}
				else if (data.status == "error" && data.statusCode == 401){
					window.location = "/login";
				}
				else if(data.status == "error"){
					window.location = "/blogs/" + id + "/edit";
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
			console.log()
			console.log(result)
			if(result){
				$.ajax({
					type : 'delete',
					url : '/comments/' + cid,
					success : function(data, textStatus){
						if(data.status == "success"){
							window.location = "/blogs/" + bid;
						}
						else if (data.status == "error" && data.statusCode == 401){
							window.location = "/login";
						}
						else if(data.status == "error"){
							window.location = "/blogs/" + bid;
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
			url : '/users/' + id,
			data : {
				id : id,
				name : name,
				email : email
			},
			success : function(data, textStatus){
				if(data.status == "success"){
					window.location = "/users/" + id;
				}
				else if (data.status == "error" && data.statusCode == 401){
					window.location = "/login";
				}
				else if(data.status == "error"){
					window.location = "/users/" + id + "/edit";
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
			url : '/users/' + id,
			data : {
				id : id,
				password : new_pwd,
				conf_password : conf_pwd,
				old_password : old_pwd
			},
			success : function(data, textStatus){
				if(data.status == "success"){
					window.location = "/users/" + id;
				}
				else if (data.status == "error" && data.statusCode == 401){
					window.location = "/login";
				}
				else if(data.status == "error"){
					window.location = "/users/" + id + "/changePassword";
				}
				
			},
			eroror : function(){
				bootbox.alert("Could not change your password, Some error occurred.", function(){
				});
			}

		});
	}

}
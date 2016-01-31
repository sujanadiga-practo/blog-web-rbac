
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
    if (pwd.val() != conf_pwd.val()){
      bootbox.alert("Passwords don't match", function(){
        pwd.val("");
        conf_pwd.val("");
        pwd.focus();
      });
    }

  },
  checkEmailAvalability : function(){

  },
  checkTagModeratorSelected : function (tag_selected){
    var role = $("#role").val();
    console.log(role)
    $('#tagMaintained').remove();
    if(role == "tagModerator"){
      $.ajax({
          type : 'get',
          url : '/tags',
          success : function(data, textStatus){
            if(data.status == "success"){
              console.log(data);
              var tags = data.payload.tags;
              var options = "";
              for(i in tags){
                var tag = tags[i];
                if(tag_selected == tag.id){
                  options += "<option value=" + tag.id + " selected>" + tag.tag + "</option>";
                }
                else{
                  options += "<option value=" + tag.id + ">" + tag.tag + "</option>";
                }
              }
              console.log(options);
              var tags_field = "<div class='form-group' id='tagMaintained'><label for='tagMaintained'>Select Tag :</label><select class='form-control' id='tagMaintainedId' name='tagMaintained' required=true>" + options + "</select></div>";
              $("#role_field").after(tags_field);
            }
          },
          eroror : function(xhr, textStatus, error){
            bootbox.alert("Could not fetch all tags, Some error occurred.");
          }

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
          url : '/blogs/' + id,
          success : function(data, textStatus){
            if(data.status == "success"){
              if(window.location.pathname == '/blogs/' + id) window.location = "/";
              else location.reload(true);

            }
            else if (data.status == "error" && data.statusCode == 401){
              window.location = "/login";
            }
            else if(data.status == "error"){
              if(window.location.pathname == '/blogs/' + id) window.location = "/blogs/" + id;
              else location.reload(true);
              
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
    var tags = $("#tags").val();

    $.ajax({
      type : 'put',
      url : '/blogs/' + id,
      data : {
        id : id,
        author : author,
        title : title,
        tags : tags,
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
              if(bid)
                window.location = "/blogs/" + bid;
              else
                location.reload(true);
            }
            else if (data.status == "error" && data.statusCode == 401){
              window.location = "/login";
            }
            else if(data.status == "error"){
              if(bid)
                window.location = "/blogs/" + bid;
              else
                location.reload(true);
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
  confirmDelete : function (id) {
    console.log(id)
    bootbox.confirm("Do you want to remove this user?", function(result){
      if(result){
        console.log(result)
        $.ajax({
          type : 'delete',
          url : '/users/' + id,
          success : function(data, textStatus){
            if(data.status == "success"){
              // window.location = "/";
              location.reload(true);
            }
            else if (data.status == "error" && data.statusCode == 401){
              window.location = "/login";
            }
            else if(data.status == "error"){
              location.reload(true);
              // window.location = "/users";
            }
          },
          eroror : function(xhr, textStatus, error){
            bootbox.alert("Could not remove the user, Some error occurred.", function(){
            });
          }

        });
      }
    });
  },
  update : function () {
    var name = $("#name").val();
    var id = $("#user_id").val();
    var email = $("#email").val();
    var role = $("#role").val();
    var tagMaintained = $("#tagMaintainedId").val();

    $.ajax({
      type : 'put',
      url : '/users/' + id,
      data : {
        id : id,
        name : name,
        email : email,
        role : role,
        tagMaintained : tagMaintained
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
tag = {
  confirmDelete : function (id) {
    console.log(id)
    bootbox.confirm("Do you want to delete this tag?", function(result){
      if(result){
        console.log(result)
        $.ajax({
          type : 'delete',
          url : '/tags/' + id,
          success : function(data, textStatus){
            if(data.status == "success"){
              location.reload(true);
            }
            else if (data.status == "error" && data.statusCode == 401){
              window.location = "/login";
            }
            else if(data.status == "error"){
              location.reload(true);
            }
          },
          eroror : function(xhr, textStatus, error){
            bootbox.alert("Could not delete the tag, Some error occurred.", function(){
            });
          }

        });
      }
    });
  },
}
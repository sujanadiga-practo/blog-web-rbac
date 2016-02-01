
module.exports = {
  init : function (cb){

    RBAC = require('rbac');
    rbac = new RBAC(sails.config.connections.MySQLDb)
    var roles = ['admin', 'user', 'tagModerator', 'commentModerator', 'reporter', 'guest', 'loggedInUser', 'administrative'];

    var permissions = {
      user: ['list', 'create', 'delete', 'update', 'find', 'login', 'logout', 'index', 'changepassword', 'changerole','edit', 'show', 'listblogs', 'router'],
      blog: ['list', 'listcustom', 'create', 'update', 'delete', 'find', 'index', 'new', 'show', 'edit'],
      comment: ['list', 'delete', 'create', 'find', 'index'],
      report: ['generate'],
      tag: ['list', 'delete', 'create', 'find', 'index', 'new'],
      dashboard : ['show'],
    };

    var grants = {
      administrative : ['list_blog', 'list_user', 'list_tag', 'list_comment'],

      guest:['find_blog', 
             'find_tag',
             'show_dashboard', 
             'show_blog', 
             'index_blog',
             'index_tag', 
             'find_comment',
             'login_user', 
             'create_user', 
             'router_user'],
      loggedInUser: ['show_user', 
                     'find_tag',
                     'edit_user', 
                     'changepassword_user', 
                     'update_user',
                     'logout_user'
                    ],
      tagModerator: ['loggedInUser',
                     'show_dashboard', 
                     'show_blog',
                     'find_blog',
                     'listcustom_blog'
                    ],
      commentModerator: ['loggedInUser',
                         'list_comment',
                         'delete_comment',
                         'show_dashboard', 
                        ],
      reporter: ['loggedInUser',
                 'generate_report',
                 'administrative',
                 'show_dashboard', 
                ],
      user: ['loggedInUser',
             'find_blog', 
             'show_dashboard', 
             'show_blog', 
             'index_blog', 
             'find_comment', 
             'find_tag', 
             'create_blog',
             'update_blog', 
             'delete_blog', 
             'create_comment', 
             'delete_comment', 
             'new_blog', 
             'listblogs_user',
             'edit_blog'],
      admin: ['user', 
              'administrative',
              'changerole_user',
              'show_dashboard',
              'find_user', 
              'index_user', 
              'delete_user', 
              'update_user', 
              'create_tag', 
              'delete_tag', 
              'index_tag', 
              'new_tag']
    };

    rbac.create(roles, permissions, grants, function(err, data) {
      if(err) {
        return false;
      }
      else{
        console.log(data)
        cb();
      }
    });  
  } 
}
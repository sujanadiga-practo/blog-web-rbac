/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

   '/': { 
    view : 'index'},

  'get /blogs': 'Blog.index',

  'post /users' : 'User.create', 

  'post /login' : 'User.login',

  'get /logout' : 'User.logout',
  
  'get /login' : 'User.router',
  
  'get /signup' : 'User.router',
  
  'get /users' : 'User.index',

  'get /users/:id' : 'User.show',

  'delete /users/:id' : 'User.delete',

  'get /users/:id/edit' : 'User.edit',

  'get /users/:id/changePassword' : 'User.changePassword',

  'put /users/:id' : 'User.update',

  'get /blogs/new' : 'Blog.new',

  'post /blogs' : 'Blog.create', 

  'get /blogs/:id' : 'Blog.show',
  
  'put /blogs/:id' : 'Blog.update',

  'get /blogs/:id/edit' : 'Blog.edit',

  'delete /blogs/:id' : 'Blog.delete',

  'get /users/:id/blogs' : 'User.listBlogs',

  'post /comments' : 'Comment.create',

  'delete /comments/:id' : 'Comment.delete',

  'get /dashboard' : 'Dashboard.show',

  'get /tags/new' : 'Tag.new',

  'get /tags' : 'Tag.index',

  'post /tags' : 'Tag.create',

  'put /tags/:id' : 'Tag.update',

  'delete /tags/:id' : 'Tag.delete',

  
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};

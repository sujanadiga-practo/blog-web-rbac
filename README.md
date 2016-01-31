# blog-api-web

This application is the client end of Blog App, this uses APIs provided by `blog-api-rbac`.

### Version
0.0.1

### Tech
This application uses following technologies,
* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [sails.js](http://sailsjs.org/) - webframework build over expressjs
* [mysql](https://www.mysql.com) - opensource database

### Installation
Below are the steps you need to follow for installation:

```sh
$ git clone https://github.com/sujanadiga-practo/blog-api-web.git
$ cd blog-api-web
$ sudo npm install
```

Blog-WEB is a sails app that runs of port 1339, so you can access the application on http://10.0.1.2:1339 (on vagrant) or on http://localhost:1339 (on local machine)

###Packages Installed
* [jade](http://jade-lang.com/) - Templating engine for your sails app
* [moment.js](http://momentjs.com/) - Date-time formatting
* [rbac](https://www.npmjs.com/package/rbac) - Hierarchical Role Based Access Control
* [superagent](https://www.npmjs.com/package/superagent) - SuperAgent is a small progressive client-side HTTP request library, and Node.js module with the same API, sporting many high-level HTTP client features. 
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findOne({ id: id } , function (err, user) {
	done(err, user);
});
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, function(err, out){
      	if(!out){
      		return done(null, false, {message : 'Incorrect password'});
      	}
      	ret = {
      		username : user.username,
      		email : user.email,
      		id : user.id
      	};
      	return done(null, ret, { message : 'Login Successful' });	
      })
    });
  }
));
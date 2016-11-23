// Import (require)
// =============================================================================
var bcrypt = require('bcryptjs');
var models  = require('../models');
var express = require('express');


// Create app router
// =============================================================================
var router  = express.Router();


// GET - retrieve data
router.get('/new', function(req,res) {
	res.render('users/new');
});

router.get('/sign-in', function(req,res) {
	res.render('users/sign_in');
});

router.get('/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/')
  })
});


// POST - findOne - login
router.post('/login', function(req, res) {
  models.Users.findOne({
    where: {email: req.body.email}
  }).then(function(user) {
  		// If no user, ask user to sign in
		if (user == null){
			res.redirect('/users/sign-in')
		}
		// Use bcrypt to compare the user's password input
		// with the hash stored in the user's row. 
		bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
			// If pass and hash match, result is true save the user's information to req.session
			if (result == true){
				// Save login status to the session
				req.session.logged_in = true;
				// Save username to the session
				req.session.username = user.username;
				// Save user id to the session
				req.session.user_id = user.id;
				// Save user's email to the session
				req.session.user_email = user.email;
				// Redirect user to homepage
				res.redirect('/');
      		} else {
      			// Redirect user to sign in
				res.redirect('/users/sign-in')
			}
    	});
  	});
});


// POST - findAll & create - register a user
router.post('/create', function(req,res) {
	models.Users.findAll({
    	where: {email: req.body.email}
  	}).then(function(users) {
	  	if (users.length > 0){
			console.log(users)
			res.send('we already have an email or username for this account')
		} else {
			// Using bcrypt, generate a 10-round salt,
			// then use that salt to hash the user's password.
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.body.password, salt, function(err, hash) {
					// Using the Users model, create a new user,
					// storing the email they sent and the hash that was just made
					models.Users.create({
						email: req.body.email,
						password_hash: hash
					}).then(function(user){
						// Save login status to the session
						req.session.logged_in = true;
						// Save username to the session
						req.session.username = user.username;
						// Save user id to the session
						req.session.user_id = user.id;
						// Save user's email to the session
						req.session.user_email = user.email;
						// Redirect to home on login
						res.redirect('/')
					});
				});
			});
		}
	});
});


module.exports = router;
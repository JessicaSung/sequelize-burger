// Import (require) burgers.js
// =============================================================================
var express = require('express');

var models = require('../models');


// Create app router
// =============================================================================
var router = express.Router();


// GET - findAll
router.get('/', function (req, res) {
  // Use the Burgers model to find all burgers,
  // and use the include option to grab info from the User model.
  // This will show the burger and its owner.
  models.Burgers.findAll({
    include: [ models.Users ]
  })
  // connect the findAll to with .then
  .then(function(burgers) {
    // grab the user info from our req which gets saved 
    // to req via the users_controller.js file.
    res.render('burgers/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      burgers: burgers
    })
  })
});


// POST - create
router.post('/create', function (req, res) {
  // Use the Burger model to create a burger based on what's
  // passed in req.body (burger_name)
  models.Burgers.create({
    burger_name: req.body.name,
    user_id: req.session.user_id
  })
  // connect the .create to .then
  .then(function() {
    res.redirect('/');
  })
});


// PUT - update
router.put('/update/:id', function(req,res) {
  // Use the Burger model to update a burger's devoured status
  // based on the boolean passed in req.body Burger
  // and the id of the Burger (as passed in the url)
  models.Burgers.update(
  {
    devoured: req.body.devoured
  },
  {
    where: { id : req.params.id }
  })
  // connect it to .then.
  .then(function (result) {
    res.redirect('/');
  })
});


// DELETE - destroy
router.delete('/delete/:id', function(req,res) {
  // use the Burger model to delete a burger
  // based on the id passed in the url
  models.Burgers.destroy({
    where: {
      id: req.params.id
    }
  })
  // connect it to .then.
  .then(function() {
    res.redirect('/');
  })
});


// Export router
// =============================================================================
module.exports = router;
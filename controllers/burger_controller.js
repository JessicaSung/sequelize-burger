// Import (require) burgers.js
// =============================================================================
var express = require('express');

var models = require('../models')
models.sequelize.sync();


// Create app router
// =============================================================================
var router = express.Router();


// GET - selectAll
router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	models.selectAll(function (data) {
		var hbsObject = { burgers: data };
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});


// POST - insertOne
router.post('/burgers/create', function (req, res) {
	models.insertOne(['burger_name'], [req.body.name], function () {
		res.redirect('/burgers');
	});
});


// PUT - updateOne
router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	models.updateOne({ devoured: req.body.devoured }, condition, function () {
		res.redirect('/burgers');
	});
});

// DELETE - deleteOne
router.delete('/burgers/delete/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	models.deleteOne(condition, function () {
		res.redirect('/burgers');
	});
});


// Export router
// =============================================================================
module.exports = router;
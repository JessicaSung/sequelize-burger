// DEPENDENCIES
// ==============================================
var express = require('express');
var exphbs = require('express-handlebars');
var mysql = require('mysql');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models = require('./models');

// SETUP EXPRESS SERVER
// ==============================================
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Tells app to use handlebars to create the layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Import and use router from controller.js file
var router = require('./controllers/burger_controller.js');
app.get('/', function(req, res) {res.redirect('/burgers')})
app.use('/burgers', router);


models.sequelize.sync();


// DEFINE PORT AND START SERVER LISTEN
// ==============================================
var PORT = 3000;
app.listen(process.env.PORT || PORT);
console.log("Local host:" + PORT);
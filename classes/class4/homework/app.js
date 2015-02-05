// Utility Imports
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

// Route Imports
var base = require('./routes/base');

// Config
var app = express();
var mongoURI = process.env.MONGOURI || "mongodb://localhost/restaurant";
var PORT = process.env.PORT || 3000;
mongoose.connect(mongoURI);
app.engine('handlebars', hbs({
    defaultLayout: 'base',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routing Table
app.get('/', base.home);
// Get Requests
app.get('/ingredients', base.ingredients);
app.get('/order', base.order);
app.get('/kitchen', base.kitchen);
// Post Requests
app.post('/newIngredient', base.newIngredient);
app.post('/addOrder', base.addOrder);
app.post('/editIngredient', base.editIngredient);
app.post('/toggleIngredient', base.toggleIngredient);
app.post('/doneOrder', base.doneOrder);

// Listen
app.listen(PORT);
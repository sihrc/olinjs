/* REQUIRES */
// ...npm
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ...local
var index = require('./routes/index.js');


/* CONNECT TO MONGOOSE */
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/restaurant');


/* CONFIG APP */
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


/* ROUTING */
app.get('/', index.home);
app.get('/ingredients', index.ingredients);
app.get('/order', index.makeOrder);
app.get('/kitchen', index.kitchen);

app.post('/outStock', index.outStock);
app.post('/inStock', index.inStock);
app.post('/addOrder', index.addOrder);
app.post('/deleteOrder', index.deleteOrder);
app.post('/editIngredient', index.editIngredient);
app.post('/newIngredient', index.newIngredient);

app.listen(process.env.PORT || 3000);
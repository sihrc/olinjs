var mongoose = require("mongoose");

var ingredient_ = mongoose.Schema({
	name: String,
	cost: Number,
	stock: Boolean
});

var order_ = mongoose.Schema({
	  name: String
	, ingredients: [ String ]
	, 
});

exports.Ingredient = mongoose.model('ingredient', ingredient_);
exports.Order = mongoose.model('order', order_);
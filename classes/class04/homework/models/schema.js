var mongoose = require("mongoose");

// Ingredient
var ingredient_ = mongoose.Schema({
    name: String,
    cost: Number,
    stock: Boolean
});

// Order
var order_ = mongoose.Schema({
    name: String,
    ingredients: [String],
    ingredientStr: String,
    totalCost: Number
});

exports.Ingredient = mongoose.model('ingredient', ingredient_);
exports.Order = mongoose.model('order', order_);
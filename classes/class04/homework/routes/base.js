var schema = require('../models/schema');

exports.home = function (req, res) {
    res.render('index');
};

exports.ingredients = function (req, res) {
    schema.Ingredient.find({}, function (err, data) {
        res.render('ingredients', {ingredients: data});
    })
}

exports.order = function (req, res) {
    schema.Ingredient.find({}, function (err, data) {
        if (err) {
            console.log("Failed to get list of ingredients");
            res.status(500, {error: "Failed to get list of ingredients " + err});
            return;
        }
        res.render('order', {ingredients: data});
    });
}

exports.kitchen = function (req, res) {
    schema.Order.find({}, function (err, data) {
        res.render("kitchen", {orders: data});
    });
}

exports.addOrder = function (req, res) {
    var ingredients = [];
    for (var key in req.body) {
        if (key && key != "total_cost" && key != "name" && key != "ingredientStr" && key != req.body.hasOwnProperty(key) && req.body[key]) {
            ingredients.push(key);
        }
    }
    schema.Order({
          name: req.body.name
        , ingredients: ingredients
        , ingredientStr: req.body.ingredientStr
        , totalCost: req.body.totalCost
    }).save(function (err) {
        if (err) {
            console.log("Error saving order");
            res.status(500, {error: "Error saving order " + err});

        }
        console.log(req.body.name);
        res.render("ordered", {orderName: req.body.name});
    });
}

exports.doneOrder = function (req, res) {
    schema.Order.find({_id: req.body.id}).remove().exec(function (err) {
        console.log("Could not delete order");
        res.status(500, {error: "Could not delete order " + err});
    });
}


exports.newIngredient = function (req, res) {
    console.log(req.body);
    var obj_ = schema.Ingredient({
          name: req.body.name ? req.body.name : "Random Name"
        , cost: req.body.cost
        , stock: true
    });

    obj_.save(function (err) {
        if (err) {
            console.log("Failed to save ingredient", err);
            res.status(500, {error: "Failed to save ingredient " + err});
        }
        res.json(obj_);
    })
}

exports.editIngredient = function (req, res) {
    console.log(req.body);
    schema.Ingredient.update({_id: req.body.id}, { $set: { name: req.body.name, cost: req.body.cost} }, { upsert: true}, function (err) {
        if (err) {
            console.log("editIngredient", err);
            res.status(500, {error: "Failed to edit ingredient " + err});

        }
        res.end('.');
    });
}

exports.toggleIngredient = function (req, res) {
    console.log(req.body);
    schema.Ingredient.update({_id: req.body.id}, { $set: { stock: req.body.stock } }, { upsert: true }, function (err) {
        if (err) {
            console.log("toggleIngredient", err);
            res.status(500, {error: "Failed to toggle ingredient " + err});
        }
        res.end('.');
    });
}
var schema = require("../models/schema");


exports.home = function(req, res) {
	res.render('home');
}

exports.ingredients = function(req, res) {
	schema.Ingredient.find({}, function(err, data) {
		res.render('ingredients', {ingredients: data});
	});
}

exports.makeOrder = function(req, res) {
	schema.Ingredient.find(function(err, data) {
		res.render('order', {'ingredients':formatPrice(data)});
	});
}

exports.kitchen = function(req, res) {
	schema.Order.find(function(err, data) {
		res.render('kitchen', {'orders': data});
	});
}

exports.outStock = function(req, res) {
	schema.Ingredient.update({'_id':req.body.id}
		, {'stock':false}
		, function(err, num, data) {
			res.end(req.body.id);
		}
	);
}

exports.inStock = function(req, res) {
	schema.Ingredient.update({'_id':req.body.id}
		, {'stock':true}
		, function(err, num, data) {
			res.end(req.body.id);
		}
	);
}

exports.deleteOrder = function(req, res) {
	Order.findOneAndRemove({'_id': req.body.id}
		, function(err, data) {
			res.end(req.body.id);
		});
}

exports.addOrder = function(req, res) {
	var obj_ = new schema.Order({
					  'name': req.body['name']
					, 'ingredients':req.body['ingredients']});
	obj_.save(function(err) {
		res.render('orderComplete');
	});
}

exports.editIngredient = function(req, res) {
	schema.Ingredient.update({'_id': req.body.id}
			, updated
			, function (err, num, data) {
				res.end(req.body);
			});
}

exports.newIngredient = function(req, res) {
	var obj_ = new schema.Ingredient({
		  name: req.body.name
		, cost: req.body.cost
		, stock: true
	});

	schema.Ingredient.count({'name': req.body.name}, function (err, count) {
		if (!count) {
			obj_.save(function(err) {
				if (err) {
					console.log("Shit gone awry.");
				}
			});
		}

		res.end();
	});
}
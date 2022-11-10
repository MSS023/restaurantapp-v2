const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
	id: String,
	img: String,
	name: String,
	description: String,
	type: String,
	price: Number
});

const Dish = new mongoose.model('Dish', dishSchema);

module.exports = { Dish, dishSchema };

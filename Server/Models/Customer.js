const mongoose = require('mongoose');
const { dishSchema } = require('./Dish');

const customerSchema = new mongoose.Schema({
	name: String,
	mobile: Number,
	email: String,
	order: [dishSchema],
	amount: Number
});

const Customer = new mongoose.model('Customer', customerSchema);

module.exports = { Customer, customerSchema };

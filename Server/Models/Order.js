const mongoose = require('mongoose');
const { dishSchema } = require('./Dish');

const orderSchema = new mongoose.Schema({
	orderId: String,
	items: [dishSchema],
	custName: String,
	custMobile: Number,
	custEmail: String,
	totalPrice: Number,
	date: Date,
	mode: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { orderSchema, Order };

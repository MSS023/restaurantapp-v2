const mongoose = require('mongoose');
const { dishSchema } = require('./Dish');

const categorySchema = new mongoose.Schema({
	category: String,
	items: [dishSchema]
});

const Category = new mongoose.model('Category', categorySchema);

module.exports = { Category, categorySchema };

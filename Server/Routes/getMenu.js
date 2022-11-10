const { Category } = require('../Models/Category');

async function getMenu(req, res) {
	try {
		const categories = await Category.find();
		res.send(categories);
	} catch (err) {
		console.log(err);
	}
}

module.exports = getMenu;

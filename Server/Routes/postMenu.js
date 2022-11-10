const { Category } = require('../Models/Category');
const {Dish} = require('../Models/Dish');

async function postMenu(req, res) {
	try {
		const menu = req.body;
		let cat = null;
		menu.forEach(async (category) => {
			cat = new Category(category);
            let tempDish = null;
            category.items.forEach(async (dish) => {
                tempDish = new Dish(dish)
                await tempDish.save();
            })
			await cat.save();
		});
		res.send('Post Successful');
	} catch (err) {
		console.log(err);
		res.send('Post unsuccessful');
	}
}

module.exports = postMenu;

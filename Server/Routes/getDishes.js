const { Dish } = require('../Models/Dish');

async function getDishes(req, res) {
	try {
		const query = req.query;
		const dish = await Dish.findOne({ id: query.id });
        if (dish) {
            res.send(dish);
        } else {
            throw new Error("Couldn't find the dish");
        }
	} catch (err) {
		console.log(err);
        res.send({status: 404, message: "Couldn't find the required dish"});
	}
}

module.exports = getDishes;

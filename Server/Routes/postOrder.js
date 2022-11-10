const { Order } = require('../Models/Order');

function postOrder(req, res) {
	try {
		// orderId: String,
		// items: [dishSchema],
		// custName: String,
		// custMobile: Number,
		// custEmail: String,
		// totalPrice: Number,
		// date: Date
		const order = req.body;
		console.log(req);
		const newOrder = new Order(order);
		newOrder.save();
		res.send('Order save Successful');
	} catch (err) {
		console.log(err);
		res.send("Couldn't save the order");
	}
}

module.exports = postOrder;

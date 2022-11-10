require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const getMenu = require("./Routes/getMenu");
const postMenu = require("./Routes/postMenu");
const getDishes = require("./Routes/getDishes");
const postOrder = require("./Routes/postOrder");
const PORT = process.env.PORT || 3005;

mongoose.connect(process.env.MONGODB, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("MongoDB connected");
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the restaurant's backend");
});

app.get("/menu", getMenu);

app.post("/menu", postMenu);

app.get("/dish", getDishes);

app.post('/order', postOrder);

// app.post("/order", (req, res) => {
//   try {
//     // orderId: String,
//     // items: [dishSchema],
//     // custName: String,
//     // custMobile: Number,
//     // custEmail: String,
//     // totalPrice: Number,
//     // date: Date
//     const order = req.data;
//     console.log(order);
//     // const newOrder = new Order(order);
//     // newOrder.save();
//     // res.send("Order save Successful");
//   } catch (err) {
//     console.log(err);
//     res.send("Couldn't save the order");
//   }
// });

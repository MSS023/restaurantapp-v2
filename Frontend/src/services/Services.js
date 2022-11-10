import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const URL = process.env.REACT_APP_URL;

export async function getMenu() {
  try {
    const response = await axios.get(`${URL}menu`);
    if (response.statusText === "OK") {
      return response.data;
    }
    throw new Error("Something went wrong while fetching the menu");
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong while fetching the menu");
  }
}

export async function orderFood(dishData, name, mobile, email) {
  try {
    const id = uuidv4();
    const orderObj = {
      orderId: id,
      items: Object.values(dishData),
      custName: name,
      custMobile: mobile,
      totalPrice:
        Object.values(dishData)
          .map((dish) => dish.num * dish.item.price)
          .reduce((prev, curr) => prev + curr) * 1.18,
      date: new Date(),
    };
	console.log(orderObj);
    const response = await axios.post(`${URL}order`, orderObj);
    if (response.statusText === "OK") {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong while ordering your dish");
  }
}

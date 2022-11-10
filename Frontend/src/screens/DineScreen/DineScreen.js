import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import testImage from "../../assets/testImage.jpg";
import "./DineScreen.css";
import { Button } from "react-bootstrap";
import { useOrders } from "../../store/OrderProvider";
import { useLoading } from "../../store/LoadingProvider";
import GreetingLoading from "../../components/GreetingLoading/GreetingLoading";

export default function DineScreen(props) {
  const [loading, setLoading] = useLoading();
  const [menu, setMenu] = useLocalStorage("menu");
  const [order, setOrder] = useOrders();
  const params = useParams();
  const [dish, setDish] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (params == null || params.id == null || params.categoryID == null) {
      navigate("/menu");
    }
    console.log(
      menu[params.categoryID].items.filter((item) => item.id === params.id)[0]
    );
    setDish(
      menu[params.categoryID].items.filter((item) => item.id === params.id)[0]
    );
    setLoading(false);
  }, [menu, navigate, params, setMenu, setLoading]);

  function handleAddToCart(item) {
    const id = item.id;
    if (id in order) {
      setOrder((prev) => {
        return { ...prev, [id]: { num: order[id].num + 1, item: item } };
      });
    } else {
      setOrder((prev) => {
        return { ...prev, [id]: { num: 1, item: item } };
      });
    }
  }

  function handleDeleteFromCart(item) {
    const id = item.id;
    setOrder((prev) => {
      return { ...prev, [id]: { num: prev[id].num - 1, item: item } };
    });
  }

  if (loading) {
    return <GreetingLoading />;
  }

  return (
    <div className="dine-screen h-100 d-flex flex-md-row flex-column">
      <div className="dine-image d-flex justify-content-center align-items-start">
        <img className="w-100" src={dish?.img || testImage} alt="testImage" />
      </div>
      <div className="dine-details justify-content-center px-5 d-md-flex flex-column gap-2">
        <div className="dine-name">
          <h1 className="name">{dish.name}</h1>
        </div>
        <div className="dine-description mb-5">{dish.description}</div>
        <div className="dine-price mb-5">
          <h2>₹{dish.price}</h2>
        </div>
        <div className="dine-order">
          {dish.id in order && order[dish.id].num > 0 ? (
            <>
              <Button
                className="order-cta"
                onClick={(e) => {
                  handleAddToCart(dish);
                  e.stopPropagation();
                }}
              >
                +
              </Button>{" "}
              {order[dish.id].num}{" "}
              <Button
                className="order-cta"
                onClick={(e) => {
                  handleDeleteFromCart(dish);
                  e.stopPropagation();
                }}
              >
                -
              </Button>
            </>
          ) : (
            <Button
              className="order-button"
              onClick={(e) => {
                handleAddToCart(dish);
                e.stopPropagation();
              }}
            >
              Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

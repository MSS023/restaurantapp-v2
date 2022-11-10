import "./OrderStatus.css";
import { Button, Col, Container, Form, Offcanvas, Row } from "react-bootstrap";
import testImage from "../../assets/testImage.jpg";
import { useOrders } from "../../store/OrderProvider";
import { useEffect, useRef } from "react";
import { orderFood } from "../../services/Services";
import { message } from "antd";

export default function OrderStatus(props) {
  const [showOrder, setShowOrder] = props.showOrder;
  const [order, setOrder] = useOrders();
  const detailRef = useRef();
  const total = useRef(0);

  useEffect(() => {
    total.current = 0;
    Object.keys(order).forEach((id) => {
      if (order[id].num) total.current += order[id].num * order[id].item.price;
    });
  }, [order]);

  function handleHide() {
    setShowOrder(false);
  }

  function handleAddToCart(item) {
    const id = item.id;
    total.current += item.price;
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
    total.current -= item.price;
    setOrder((prev) => {
      return { ...prev, [id]: { num: prev[id].num - 1, item: item } };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(detailRef);
    try {
      const request = await orderFood(
        Object.values(order),
        detailRef.current.name.value,
        detailRef.current.phone.value,
        detailRef.current.email.value
      );
      if (request) {
        setOrder({});
      } else {
        message.warning("Please try again some other time");
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong");
    }
  }

  return (
    <Offcanvas
      show={showOrder}
      onHide={handleHide}
      scroll={true}
      backdrop={true}
      placement="end"
    >
      <Offcanvas.Header closeButton className="order-title">
        <Offcanvas.Title>Order Status</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="order-body">
        <div className="order-items">
          <h2>Items</h2>
          <Container>
            {Object.keys(order).map((id) => {
              return order[id].num ? (
                <Row
                  className="order-dish my-2 w-100 p-2 align-items-center"
                  key={id}
                >
                  <Col className="col-2">
                    <img
                      className="order-dish-image"
                      src={order[id].item.img || testImage}
                      alt="test"
                    />
                  </Col>
                  <Col className="col-6">
                    <p className="order-name px-2 my-auto">
                      {order[id].item.name}
                    </p>
                  </Col>
                  <Col className="col-4 cta d-flex align-items-center justify-content-center">
                    <Button
                      className="p-1 align-items-center add-button me-1"
                      onClick={(e) => {
                        handleAddToCart(order[id].item);
                        e.stopPropagation();
                      }}
                    >
                      +
                    </Button>{" "}
                    {order[id].num}{" "}
                    <Button
                      className="p-1 align-items-center add-button ms-1"
                      onClick={(e) => {
                        handleDeleteFromCart(order[id].item);
                        e.stopPropagation();
                      }}
                    >
                      -
                    </Button>
                  </Col>
                </Row>
              ) : (
                ""
              );
            })}
          </Container>
        </div>
        {total.current ? (
          <div className="checkout-details px-3">
            <div className="total-container">
              <div className="subtotal d-flex justify-content-between">
                <span>Sub-total:</span>
                <span> ₹{total.current}</span>
              </div>
              <div className="tax d-flex justify-content-between">
                <span>Tax(18%):</span> <span>₹{total.current * 0.18}</span>
              </div>
              <div className="total d-flex justify-content-between">
                <span>Total:</span> <span>₹{total.current * 1.18}</span>
              </div>
            </div>
            <h5>Please enter your details to do payment</h5>
            <Form
              className="d-flex flex-column gap-2"
              onSubmit={handleSubmit}
              ref={detailRef}
            >
              <div className="d-flex gap-1">
                <Form.Control placeholder="Name" name="name" />
                <Form.Control placeholder="Phone" type="number" name="phone" />
              </div>
              <Form.Control placeholder="Email" name="email" type="Email" />
              <div className="d-flex justify-content-center gap-2">
                <Button className="flex-fill" type="submit">
                  Cash
                </Button>
                {/* <Button className="flex-fill" type="submit">
                  Razor Pay
                </Button> */}
              </div>
            </Form>
          </div>
        ) : (
          ""
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

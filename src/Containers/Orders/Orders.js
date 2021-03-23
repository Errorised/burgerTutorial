import React, { Component } from "react";
import Order from "./Order/Order";
import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  _isMounted;
  async componentDidMount() {
    this._isMounted = true;
    try {
      const response = await axios.get("/orders.json");
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key,
        });
      }
      if (this._isMounted) {
        this.setState({ loading: false, orders: fetchedOrders });
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const orderDisplay = this.state.orders.map((order) => {
      return (
        <Order
          ingredients={order.ingredients}
          price={order.price}
          key={order.id}
          id={order.id}
        />
      );
    });

    return <div>{orderDisplay}</div>;
  }
}

export default Orders;

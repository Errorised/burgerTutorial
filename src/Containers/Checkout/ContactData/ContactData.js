import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import { withRouter } from "react-router-dom";
import Spinner from "../../../Components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    adress: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };
  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Horst Müller",
        adress: {
          street: "Teststreet 1",
          zipCode: "46245",
          country: "Germany",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    try {
      const response = await axios.post("/orders.json", order);
      this.setState({ loading: false, orderButtonClicked: false });
      this.props.history.push("/");
    } catch (err) {
      this.setState({ loading: false, orderButtonClicked: false });
    }
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form>
            <input type="text" name="name" placeholder="Your Name"></input>
            <input type="text" name="email" placeholder="Your Email"></input>
            <input type="text" name="street" placeholder="Street"></input>
            <input type="text" name="postal" placeholder="Postal Code"></input>
            <Button btnType="Success" click={this.orderHandler}>
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default withRouter(ContactData);

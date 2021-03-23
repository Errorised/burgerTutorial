import React, { Fragment } from "react";
import Button from "../../../UI/Button/Button";
import { Link } from "react-router-dom";

const orderSummary = (props) => {
  const { ingredients, price, cancelOrder, continueOrder } = props;
  const ingredientSummary = Object.keys(ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        {igKey} : {ingredients[igKey]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        Total Price:<strong> {price.toFixed(2)} €</strong>
      </p>
      <Button btnType="Danger" click={cancelOrder}>
        CANCEL
      </Button>
      {/* <Link
        to={{
          pathname: "/checkout",
          ingredients: ingredients,
          price: price
        }}
      > */}
        <Button btnType="Success" click={continueOrder}>
          ORDER
        </Button>
      {/* </Link> */}
    </Fragment>
  );
};

export default orderSummary;

import React, { Fragment } from "react";
import Button from '../../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => {
      return <li key={igKey} >{igKey} : {props.ingredients[igKey]}</li>
  })
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
          {ingredientSummary}
      </ul>
      <p>Total Price:<strong> {props.price.toFixed(2)} €</strong></p>
      <Button btnType="Danger" click={props.cancelOrder}>CANCEL</Button>
      <Button btnType="Success" click={props.continueOrder}>ORDER</Button>
    </Fragment>
  );
};

export default orderSummary;

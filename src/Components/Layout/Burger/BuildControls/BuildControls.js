import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const buildControls = (props) => {
  let ingredientsArray = Object.keys(props.ingredients);
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Prize: <strong>{props.price.toFixed(2)} €</strong>
      </p>
      {ingredientsArray.map((ingredient) => (
        <BuildControl
          label={ingredient}
          key={ingredient}
          added={() => props.ingredientAdded(ingredient)}
          removed={() => props.ingredientRemoved(ingredient)}
          disabled={props.disabledInfo[ingredient]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.order}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;

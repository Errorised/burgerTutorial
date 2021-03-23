import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  const { ingredients, price } = props;
  const ingredientSummary = Object.keys(ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        {igKey} : {ingredients[igKey]}
      </li>
    );
  });

  const ingredientsArray = [];
  for (let ingredientName in ingredients) {
    ingredientsArray.push({
      ingredient: ingredientName,
      amount: ingredients[ingredientName],
    });
  }
  console.log(ingredientsArray);

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientSummary} </p>
      <p>
        Price: <strong>{Number.parseFloat(price).toFixed(2)} €</strong>
      </p>
    </div>
  );
};

export default order;

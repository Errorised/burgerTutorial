import React, { Component, Fragment } from "react";
import Burger from "../../Components/Layout/Burger/Burger";
import BuildControls from "../../Components/Layout/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Layout/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRIZES = {
  salad: 0.4,
  meat: 1.3,
  bacon: 0.7,
  cheese: 0.6,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrize: 4,
    purchaseable: false,
    orderButtonClicked: false,
  };
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    const updatedPrize = this.state.totalPrize + INGREDIENT_PRIZES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrize: updatedPrize,
    });
    this.updatePurchaseButton(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    const updatedPrize = this.state.totalPrize - INGREDIENT_PRIZES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrize: updatedPrize,
    });
    this.updatePurchaseButton(updatedIngredients);
  };

  updatePurchaseButton = (ingredients) => {
    const numberOfIngredients = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    });
    console.log(numberOfIngredients);
    if (numberOfIngredients > 0) {
      this.setState({ purchaseable: true });
    } else {
      this.setState({ purchaseable: false });
    }
  };

  purchaseHandler = () => {
    this.setState({ orderButtonClicked: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ orderButtonClicked: false });
    console.log("disable");
  };

  purchaseContinueHandler = () => {
    alert("You continue!");
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.orderButtonClicked}
          disable={this.purchaseCancelHandler}
        >
          <OrderSummary 
          ingredients={this.state.ingredients} 
          price={this.state.totalPrize}
          cancelOrder = {this.purchaseCancelHandler}
          continueOrder = {this.purchaseContinueHandler}/>
          {console.log(this.state.orderButtonClicked)}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredients={this.state.ingredients}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrize}
          purchaseable={this.state.purchaseable}
          order={this.purchaseHandler}

        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;

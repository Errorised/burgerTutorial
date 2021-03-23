import React, { Component, Fragment } from "react";
import Burger from "../../Components/Layout/Burger/Burger";
import BuildControls from "../../Components/Layout/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Layout/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRIZES = {
  salad: 0.4,
  meat: 1.3,
  bacon: 0.7,
  cheese: 0.6,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrize: 4,
    purchaseable: false,
    orderButtonClicked: false,
    loading: false,
    error: false,
  };
  _isMounted;
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
      totalPrize: updatedPrize.toFixed(2),
    });
    this.updatePurchaseButton(updatedIngredients);
  };

  async componentDidMount() {
    this._isMounted = true;

    try {
      const response = await axios.get(
        "https://react-my-burger-e3789-default-rtdb.firebaseio.com/ingredients.json"
      );
      if (this._isMounted = true) {
        this.setState({ ingredients: response.data });
      }
    } catch (err) {
      this.setState({ error: true });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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
  };

  purchaseContinueHandler = async () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrize);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: queryString,
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Fragment>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrize}
          cancelOrder={this.purchaseCancelHandler}
          continueOrder={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.orderButtonClicked}
          disable={this.purchaseCancelHandler}
        >
          {!this.state.loading ? orderSummary : <Spinner />}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

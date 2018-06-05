import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    errorMsg: null,
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
        this.updatePurchasable(response.data);
      }).catch(error => {
        this.setState({ errorMsg: 'Unable to load ingredients. Kindly contact your System Administrator.' });
      });
  }

  updatePurchasable = ingredients => {
    const sumOfPurchasable = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      }).reduce((sum, el) => {
        sum += el;
        return sum;
      }, 0);

    const purchasable = sumOfPurchasable > 0;
    this.setState({
      purchasable: purchasable
    });
  }

  addIngredientHandler = type => {
    const localIg = { ...this.state.ingredients };
    localIg[type] += 1;

    let localTotalPrice = this.state.totalPrice;
    localTotalPrice += INGREDIENT_PRICES[type];

    this.setState({
      ingredients: localIg,
      totalPrice: localTotalPrice,
    });
    this.updatePurchasable(localIg);
  }

  removeIngredientHandler = type => {
    const localIg = { ...this.state.ingredients };
    if (localIg[type] <= 0) {
      return;
    }

    localIg[type] -= 1;
    let localTotalPrice = this.state.totalPrice;
    localTotalPrice -= INGREDIENT_PRICES[type];

    this.setState({
      ingredients: localIg,
      totalPrice: localTotalPrice,
    });
    this.updatePurchasable(localIg);
  }

  purchaseSummaryHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  cancelPurchasingHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  continuePurchasingHandler = () => {
    // alert("Purchasing Continued!");
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Eric',
    //     address: {
    //       street: '123 street',
    //       zipCode: '2016',
    //       country: 'New Zealand',
    //     },
    //     email: 'test@gmail.com',
    //   },
    //   deliveryMethod: 'fastest',
    // };

    // axios.post('/orders.json', order)
    //   .then(response => {
    //     // console.log(response);
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(error => {
    //     // console.log(error);
    //     this.setState({ loading: false, purchasing: false });
    //   });

    this.setState({ purchasing: false });
    this.props.history.push({
      pathname: "/checkout",
      state: {
        ingredients: this.state.ingredients,
        totalPrice: this.state.totalPrice,
      }
    });
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let prop in disabledInfo) {
      disabledInfo[prop] = disabledInfo[prop] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.errorMsg ? this.state.errorMsg : <Spinner />
    if (this.state.ingredients) {
      burger =
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
            purchasing={this.purchaseSummaryHandler}
            price={this.state.totalPrice} />
        </Aux>;

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        cancelPurchasing={this.cancelPurchasingHandler}
        continuePurchasing={this.continuePurchasingHandler} />;
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.cancelPurchasingHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
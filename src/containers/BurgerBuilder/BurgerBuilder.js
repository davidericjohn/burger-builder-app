import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { addIngredient, removeIngredient, getIngredients, purchaseInit } from '../../store/actions/actionCreators';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  }

  componentDidMount() {
    this.props.onIngredientsFetch();
  }

  isPurchasable = () => {
    const sumOfPurchasable = Object.keys(this.props.ingredients)
      .map(igKey => {
        return this.props.ingredients[igKey];
      }).reduce((sum, el) => {
        sum += el;
        return sum;
      }, 0);

    return sumOfPurchasable > 0;
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
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  }

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let prop in disabledInfo) {
      disabledInfo[prop] = disabledInfo[prop] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.hasError ? <p>Unable to load ingredients. Kindly contact your System Administrator.</p> : <Spinner />
    if (this.props.ingredients) {
      burger =
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            purchasable={this.isPurchasable()}
            purchasing={this.purchaseSummaryHandler}
            price={this.props.totalPrice} />
        </Aux>;

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
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

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    hasError: state.burgerBuilder.hasError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: name => dispatch(addIngredient(name)),
    onIngredientRemoved: name => dispatch(removeIngredient(name)),
    onIngredientsFetch: () => dispatch(getIngredients()),
    onPurchaseInit: () => dispatch(purchaseInit()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
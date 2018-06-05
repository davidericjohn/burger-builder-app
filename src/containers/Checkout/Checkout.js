import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: {},
    totalPrice: 0
  }

  componentWillMount() {
    this.setState(oldState => {
      return {
        ingredients: this.props.location.state.ingredients,
        totalPrice: this.props.location.state.totalPrice,
      }
    });
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  }

  continueCheckoutHandler = () => {
    this.props.history.replace({
      pathname: '/checkout/contact-data',
      state: {
        ingredients: this.state.ingredients,
        totalPrice: this.state.totalPrice,
      }
    });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          burgerIngredients={this.state.ingredients}
          cancelCheckout={this.cancelCheckoutHandler}
          continueCheckout={this.continueCheckoutHandler} />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
    )
  }

}

export default Checkout;
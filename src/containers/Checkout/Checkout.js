import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  }

  continueCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          burgerIngredients={this.props.ingredients}
          cancelCheckout={this.cancelCheckoutHandler}
          continueCheckout={this.continueCheckoutHandler} />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);
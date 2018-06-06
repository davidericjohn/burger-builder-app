import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
    let content = <Redirect to="/" />;
    const purchased = this.props.purchased ? <Redirect to="/orders" /> : null;
    if (this.props.ingredients) {
      content =
        (
          <div>
            {purchased}
            <CheckoutSummary
              burgerIngredients={this.props.ingredients}
              cancelCheckout={this.cancelCheckoutHandler}
              continueCheckout={this.continueCheckoutHandler} />
            <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
          </div >
        );
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  }
}

export default connect(mapStateToProps)(Checkout);
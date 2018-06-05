import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const orderList = Object.keys(props.ingredients)
    .map(igKey => {
      return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}</li>
    });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {orderList}
      </ul>
      <p>Continue to Checkout?</p>
      <p><strong>Price: {props.price.toFixed(2)}</strong></p>
      <Button 
        type='Danger'
        onclick={props.cancelPurchasing}>CANCEL</Button>
      <Button 
        type='Success'
        onclick={props.continuePurchasing.bind(null, props.ingredients)}>CONTINUE</Button>
    </Aux>
  );
}

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number,
  cancelPurchasing: PropTypes.func.isRequired,
  continuePurchasing: PropTypes.func.isRequired
}

export default orderSummary;
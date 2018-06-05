import React from 'react';

import classes from './CheckoutSummary.css';
import Burger from '../../Burger';
import Button from '../../../UI/Button/Button';

const checkoutSummary = props => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.burgerIngredients} />
    </div>
    <Button type="Danger" onclick={props.cancelCheckout}>CANCEL</Button>
    <Button type="Success" onclick={props.continueCheckout}>CONTINUE</Button>
  </div>
);

export default checkoutSummary;
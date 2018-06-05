import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current Price: {props.price.toFixed(2)}</p>
    {controls.map((el, index) => (
      <BuildControl
        key={el.label + index}
        label={el.label}
        ingredientAdded={props.ingredientAdded.bind(this, el.type)}
        ingredientRemoved={props.ingredientRemoved.bind(this, el.type)}
        disabled={props.disabledInfo[el.type]} />
    ))}
    <button 
      className={classes.OrderButton} 
      disabled={!props.purchasable}
      onClick={props.purchasing}>ORDER NOW!</button>
  </div>
);

buildControls.propTypes = {
  price: PropTypes.number,
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabledInfo: PropTypes.object,
  purchasable: PropTypes.bool,
  purchasing: PropTypes.func.isRequired
}

export default buildControls;
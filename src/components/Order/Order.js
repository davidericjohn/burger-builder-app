import React from 'react';

import classes from './Order.css';

const order = props => {
  const ingredients = Object.keys(props.ingredients)
    .map(key => {
      return (
        <span key={key} className={classes.Ingredients}>
          {key} ({props.ingredients[key]})
        </span>
      );
    });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {props.price}</strong></p>
    </div>
  )
}

export default order;
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {

  // salad: 1, bacon, 1, cheese 2, meat 2
  // [salad, bacon, cheese, meat]
  // [1], [1], [2], [2]
  /*<BurgerIngredient type='salad'/> 
  <BurgerIngredient type='bacon'/>
  <BurgerIngredient type='cheese'/>
  <BurgerIngredient type='cheese'/>
  <BurgerIngredient type='meat'/>
  <BurgerIngredient type='meat'/>
  */
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])]
        .map((_, index) => {
          return <BurgerIngredient key={igKey + index} type={igKey} />
        });
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

burger.propTypes = {
  ingredients: PropTypes.object.isRequired
}

export default burger;
import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.css';

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button 
      className={classes.Less} 
      onClick={props.ingredientRemoved}
      disabled={props.disabled}>Less</button>
    <button 
      className={classes.More} 
      onClick={props.ingredientAdded}>More</button>
  </div>
);

buildControl.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string
}

export default buildControl;
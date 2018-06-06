import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.css';

const button = props => (
  <button
    disabled={props.disabled}
    onClick={props.onclick}
    className={[classes.Button, classes[props.type]].join(' ')}>{props.children}</button>
)

button.propTypes = {
  onclick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node
}

export default button;
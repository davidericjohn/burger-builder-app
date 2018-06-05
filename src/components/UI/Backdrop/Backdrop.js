import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.css';

const backdrop = props => (
  props.show ? <div className={classes.Backdrop} onClick={props.onclick}></div> : null
)

backdrop.propTypes = {
  onclick: PropTypes.func.isRequired,
  show: PropTypes.bool
}

export default backdrop;
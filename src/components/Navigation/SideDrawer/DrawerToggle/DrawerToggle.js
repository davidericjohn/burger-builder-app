import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.css';

const drawerToggle = props => (
  <div className={classes.DrawerToggle} 
    onClick={props.onclick}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

drawerToggle.propTypes = {
  onclick: PropTypes.func.isRequired
}

export default drawerToggle;
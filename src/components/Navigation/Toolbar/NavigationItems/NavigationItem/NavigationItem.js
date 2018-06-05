import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './NavigationItem.css';

const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink 
      exact={props.exact} 
      activeClassName={classes.active}
      to={props.link}>
      {props.children}
    </NavLink>
  </li>
);

navigationItem.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default navigationItem;
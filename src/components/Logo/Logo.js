import React from 'react';

import classes from './Logo.css';
import imgLogo from '../../assets/images/burger-logo.png';

const logo = () => (
  <div className={classes.Logo}>
    <img src={imgLogo} alt='My Burger'/>
  </div>
);

export default logo;
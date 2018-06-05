import React from 'react';
import PropTypes from 'prop-types';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Toolbar/NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = props => {

  const sideDrawerClasses = [classes.SideDrawer];
  if(props.open) {
    sideDrawerClasses.push(classes.Open);
  } else {
    sideDrawerClasses.push(classes.Close);
  }

  return (
    <Aux>
      <Backdrop show={props.open} onclick={props.backdropclicked}/>
      <div className={sideDrawerClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
}

sideDrawer.propTypes = {
  open: PropTypes.bool,
  backdropclicked: PropTypes.func.isRequired
}

export default sideDrawer;
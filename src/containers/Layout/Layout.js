import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Layout.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

  state = {
    sideBarOpen: false,
  }

  sideBarToggleHandler = () => {
    this.setState((prevState) => {
      return { sideBarOpen: !prevState.sideBarOpen }
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar sidebartoggleclicked={this.sideBarToggleHandler} />
        <SideDrawer
          open={this.state.sideBarOpen}
          backdropclicked={this.sideBarToggleHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux >
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout;
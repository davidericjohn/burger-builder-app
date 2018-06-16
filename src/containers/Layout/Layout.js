import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        <Toolbar
          sidebartoggleclicked={this.sideBarToggleHandler}
          isAuthenticated={this.props.isAuthenticated} />
        <SideDrawer
          open={this.state.sideBarOpen}
          backdropclicked={this.sideBarToggleHandler}
          isAuthenticated={this.props.isAuthenticated} />
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

export default connect(mapStateToProps)(Layout);
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actionCreators';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  componentDidMount() {
    this.props.onGetOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading)
      orders = this.props.orders.map((o, idx) => {
        return <Order key={o.id} order={o} />
      });

    return (
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders: token => dispatch(actions.getOrders(token)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
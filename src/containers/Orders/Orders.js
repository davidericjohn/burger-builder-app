import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { getOrders } from '../../store/actions/actionCreators';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  componentDidMount() {
    this.props.onGetOrders();
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading)
      orders = this.props.orders.map((o, idx) => {
        return <Order key={o.id} ingredients={o.ingredients} price={o.price} />
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
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders: () => dispatch(getOrders()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
import React, { Component } from 'react';
import axios from 'axios';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { convertObjRsToArray } from '../../utility/utility';

class Orders extends Component {

  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const orders = convertObjRsToArray(res.data);
        this.setState({ loading: false, orders: orders });
      }).catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    let orders = <Spinner />
    if (!this.state.loading)
      orders = this.state.orders.map((o, idx) => {
        return <Order key={o.id} ingredients={o.ingredients} price={o.price} />
      });

    return (
      <div>
        {orders}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios);
import axios from 'axios';

import * as actionTypes from './actionTypes';
import { convertObjRsToArray } from '../../utility/utility';

const purchaseOrderStart = () => {
  return {
    type: actionTypes.PURCHASE_ORDER_START
  }
}

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_ORDER_SUCCESS,
    id: id,
    orderData: orderData,
  }
}

const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_ORDER_FAIL,
    error: error,
  }
}

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseOrderStart());
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
}

const getOrdersStart = () => {
  return {
    type: actionTypes.GET_ORDERS_START
  }
}

const getOrdersSuccess = orders => {
  return {
    type: actionTypes.GET_ORDERS_SUCCESS,
    orders: orders,
  }
}

const getOrdersFail = error => {
  return {
    type: actionTypes.GET_ORDERS_FAIL,
    error: error,
  }
}

export const getOrders = token => {
  return dispatch => {
    dispatch(getOrdersStart());
    axios.get('/orders.json?auth=' + token)
      .then(res => {
        const orders = convertObjRsToArray(res.data);
        dispatch(getOrdersSuccess(orders));
      }).catch(err => {
        dispatch(getOrdersFail(err));
      });
  }
}
import * as actionTypes from './actionTypes';

export const purchaseOrderStart = () => {
  return {
    type: actionTypes.PURCHASE_ORDER_START
  }
}

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_ORDER_SUCCESS,
    id: id,
    orderData: orderData,
  }
}

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_ORDER_FAIL,
    error: error,
  }
}

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.INITIATE_PURCHASE,
    token: token,
    orderData: orderData
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
}

export const getOrdersStart = () => {
  return {
    type: actionTypes.GET_ORDERS_START
  }
}

export const getOrdersSuccess = orders => {
  return {
    type: actionTypes.GET_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const getOrdersFail = error => {
  return {
    type: actionTypes.GET_ORDERS_FAIL,
    error: error,
  }
}

export const getOrders = (token, userId) => {
  return {
    type: actionTypes.INITIATE_GET_ORDERS,
    token: token,
    userId: userId
  }
}
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const defaultState = {
  orders: [],
  loading: false,
  purchased: false,
}

const updateLoadingState = (state, isLoading) => {
  return updateObject(state, { loading: isLoading });
}

const purchaseOrderSuccess = (state) => {
  return updateObject(state, { loading: false, purchased: true });
}

const updatePurchasedState = (state, isPurchased) => {
  return updateObject(state, { loading: isPurchased });
}

const getOrders = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
}

const order = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_ORDER_START: return updateLoadingState(state, true);
    case actionTypes.PURCHASE_ORDER_SUCCESS: return purchaseOrderSuccess(state);
    case actionTypes.PURCHASE_ORDER_FAIL: return updateLoadingState(state, false);
    case actionTypes.PURCHASE_INIT: return updatePurchasedState(state, false);
    case actionTypes.GET_ORDERS_START: return updateLoadingState(state, true);
    case actionTypes.GET_ORDERS_SUCCESS: return getOrders(state, action);
    case actionTypes.GET_ORDERS_FAIL: return updateLoadingState(state, false);
    default:
      return state;
  }
}

export default order;
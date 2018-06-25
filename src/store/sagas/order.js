import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/actionCreators';
import { convertObjRsToArray } from '../../utility/utility';

export function* getOrdersSaga(action) {
  yield put(actions.getOrdersStart());
  const params = '?auth=' + action.token + '&orderBy="userId"&equalTo:"' + action.userId;
  try {
    const response = yield axios.get('/orders.json' + params);
    const orders = yield convertObjRsToArray(response.data);
    yield put(actions.getOrdersSuccess(orders));
  } catch (error) {
    yield put(actions.getOrdersFail(error));
  }
}

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseOrderStart());
  try {
    const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}
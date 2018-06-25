import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { getIngredientsSaga } from './burgerBuilder';
import { getOrdersSaga, purchaseBurgerSaga } from './order';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INITIATE_GET_INGREDIENTS, getIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.INITIATE_GET_ORDERS, getOrdersSaga);
  yield takeEvery(actionTypes.INITIATE_PURCHASE, purchaseBurgerSaga)
}
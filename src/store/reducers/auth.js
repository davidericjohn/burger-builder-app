import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/utility';

const defaultState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = state => {
  return updateObject(state, { ...state, error: null, loading: true });
}

const authSuccess = (state, action) => {
  return {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
  };
}

const authFail = (state, action) => {
  return updateObject(state, { ...state, error: action.error, loading: false });
}

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    default:
      return state;
  }
};

export default auth;
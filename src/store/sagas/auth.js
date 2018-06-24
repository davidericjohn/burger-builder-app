import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/actionCreators';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield put(actions.didLogout());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expiresIn * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  put(actions.authStart());
  const postData = {
    email: action.username,
    password: action.password,
    returnSecureToken: true,
  };

  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBWtmpDwcAiGTf9ef61l2rv1fUaCBXe8sU';
  if (action.isSignUp) {
    url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBWtmpDwcAiGTf9ef61l2rv1fUaCBXe8sU';
  }

  try {
    const response = yield axios.post(url, postData);
    yield localStorage.setItem('token', response.idToken);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId, response.data.expiresIn));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.error));
  }
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyBWtmpDwcAiGTf9ef61l2rv1fUaCBXe8sU';
    try {
      const response = yield axios.post(url, { idToken: token });
      const userId = response.data.users[0].localId;
      yield put(actions.authSuccess(token, userId));
    } catch (error) {
      yield put(actions.logout());
    }
  }
}
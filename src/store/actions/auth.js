import * as actionTypes from './actionTypes';

import axios from 'axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  }
}

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const auth = (username, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const postData = {
      email: username,
      password: password,
      returnSecureToken: true,
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDq3BWlcGe7suaJ-iRH8SxufTV4Hs78Vs8';
    if (isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDq3BWlcGe7suaJ-iRH8SxufTV4Hs78Vs8';
    }
    axios.post(url, postData)
      .then(response => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  }
}


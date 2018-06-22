import * as actionTypes from './actionTypes';

import axios from 'axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

const authSuccess = (token, userId, expiresIn) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    expiresIn: expiresIn, // TODO: handle timeout in the reducer as well as clearing timeout when necessary.
  };
}

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
}

const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const authRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch(authLogout());
  };
};

export const auth = (username, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const postData = {
      email: username,
      password: password,
      returnSecureToken: true,
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBWtmpDwcAiGTf9ef61l2rv1fUaCBXe8sU';
    if (isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBWtmpDwcAiGTf9ef61l2rv1fUaCBXe8sU';
    }
    axios.post(url, postData).then(response => {
        localStorage.setItem('token', response.data.idToken);
        dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.expiresIn));
      }).catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  }
}

export const setAuthRedirectPath = (path) => {
  return authRedirectPath(path);
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyBWtmpDwcAiGTf9ef61l2rv1fUaCBXe8sU';
      axios.post(url, {
        idToken: token,
      }).then(response => { 
        const userId = response.data.users[0].localId;
        dispatch(authSuccess(token, userId));
      }).catch(error => {
        dispatch(logout());
      });
    }
  }
}

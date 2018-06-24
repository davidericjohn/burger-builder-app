import * as actionTypes from './actionTypes';

const authLogout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

const authRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSuccess = (token, userId, expiresIn) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    expiresIn: expiresIn, // TODO: handle timeout in the reducer as well as clearing timeout when necessary.
  };
}

export const authFail = error => {
  console.log("action: " + error);
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
}

export const didLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(authLogout());
  };
};

export const checkAuthTimeout = expiresIn => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expiresIn: expiresIn
  };
};

export const auth = (username, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    username: username,
    password: password,
    isSignUp: isSignUp
  }
}

export const setAuthRedirectPath = (path) => {
  return authRedirectPath(path);
}

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
}

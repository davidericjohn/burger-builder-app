import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

describe('authReducer', () => {
  let defaultState;
  beforeEach(() => {
    defaultState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    };
  });

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should store the token upon login', () => {
    const expectedState = updateObject(defaultState, { 
      token: 'mock-token', 
      userId: 'mock-user-id' });

    expect(reducer(defaultState, {
      type: actionTypes.AUTH_SUCCESS,
      token: 'mock-token',
      userId: 'mock-user-id'
    }))
      .toEqual(expectedState);
  });

});
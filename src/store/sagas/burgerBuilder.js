import axios from 'axios';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/actionCreators';

export function* getIngredientsSaga() {
  const response = yield axios.get('/ingredients.json')
  try {
    yield put(actions.getIngredientsSuccess(response.data));
  } catch (error) {
    yield put(actions.hasErrorActionCreator(true));
  }
}
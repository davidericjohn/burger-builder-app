import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const defaultState = {
  ingredients: null,
  totalPrice: 4,
  hasError: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

const addIngredient = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, { [action.name]: state.ingredients[action.name] + 1 });
  const updatedTotalPrice = state.totalPrice + INGREDIENT_PRICES[action.name];
  return updateObject(state, { ingredients: updatedIngredients, totalPrice: updatedTotalPrice, building: true });
};

const removeIngredient = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, { [action.name]: state.ingredients[action.name] - 1 });
  const updatedTotalPrice = state.totalPrice - INGREDIENT_PRICES[action.name];
  return updateObject(state, { ingredients: updatedIngredients, totalPrice: updatedTotalPrice, building: true });
};

const getIngredients = (state, action) => {
  return updateObject(state, { ingredients: action.ingredients, totalPrice: 4, building: false });
}

const updateErrorState = (state, hasError) => {
  return updateObject(state, { hasError: hasError });
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.GET_INGREDIENTS: return getIngredients(state, action);
    case actionTypes.HAS_ERROR: return updateErrorState(state, action.hasError);
    default:
      return state;
  }
}

export default reducer;
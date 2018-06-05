import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  ingredients: null,
  totalPrice: 4,
  hasError: false,
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
}

const reducer = (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.name]: state.ingredients[action.name]+ 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name],
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.name]: state.ingredients[action.name] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.name],
      }
    case actionTypes.GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
      }
    case actionTypes.HAS_ERROR:
      return {
        ...state,
        hasError: action.hasError,
      }
    default:
      return state;
  }

}

export default reducer;
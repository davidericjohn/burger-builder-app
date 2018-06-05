import axios from 'axios';
import * as actionTypes from './actionTypes';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    name: name,
  }
}

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    name: name,
  }
}

const getIngredientsActionCreator = (ingredients, errorMsg) => {
  return {
    type: actionTypes.GET_INGREDIENTS,
    ingredients: ingredients,
    errorMsg: errorMsg,
  }
}
const hasErrorActionCreator = hasError => {
  return {
    type: actionTypes.HAS_ERROR,
    hasError: hasError,
  }
}
export const getIngredients = () => {
  return (dispatch) => {
    axios.get('/ingredients.json')
      .then(response => {
        dispatch(getIngredientsActionCreator(response.data));
        dispatch(hasErrorActionCreator(false));
      }).catch(error => {
        dispatch(hasErrorActionCreator(true));
      });
  }
}


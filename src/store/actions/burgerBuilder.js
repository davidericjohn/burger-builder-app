import * as actionTypes from './actionTypes';

export const getIngredientsSuccess = (ingredients) => {
  return {
    type: actionTypes.GET_INGREDIENTS,
    ingredients: ingredients,
    hasError: false,
  }
}

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

export const hasErrorActionCreator = hasError => {
  return {
    type: actionTypes.HAS_ERROR,
    hasError: hasError,
  }
}

export const getIngredients = () => {
  return {
    type: actionTypes.INITIATE_GET_INGREDIENTS
  }
}


import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
export const addIngredient = (name) => {
  return{
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
} 
export const removeIngredient = (name) => {
  return{
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
} 
/*------------ action creator for async code (fetching data from serrver)------------*/

export const setIngredients = (ingredients) => { // the action dispatched if succes
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}
export const fetchIngredientsFailed = () => { // the action dispatched if failed 
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
}


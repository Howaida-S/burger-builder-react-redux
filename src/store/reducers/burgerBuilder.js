import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
const initialState = {
  ingredients : null,
  totalPrice: 0,
  error: false,
  building: false
};
// extract the logic from our cases into their own functions 
const addIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],// overwrite the totalPrice
    building: true
  }
  return updateObject(state, updatedState)
}
const removeIngredient = (state, action) => {
  const updatedIng = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1};
  const updatedIngs = updateObject(state.ingredients,updatedIng);
  const updateSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],// overwrite the totalPrice
    building: true
  }
  return updateObject(state, updateSt);
}
const setIngredients = (state, action) => {
  return updateObject(state,
    {  /* instead of ingredients: action.ingredients 
      we set the ingredients manually to change the order of ingredients because it
      ordered alphabeticaaly in firebase server but we lose flexiblity */          
      ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat,
      },
      totalPrice:0, // reset price after redirect 
      error: false,
      building: false
    });
}
const fetchIngredientsFailed = (state) => {
  return updateObject(state, {error: true})
}


const burgerBuilderReducer = (state = initialState, action) => {
  switch(action.type){  
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state ;
  }
}

export default burgerBuilderReducer;

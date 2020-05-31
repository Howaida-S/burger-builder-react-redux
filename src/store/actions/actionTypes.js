export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
// for fetching data from server
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';
// for send data to server
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';// for loading 
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS'; // for success
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL'; // for fail
// for redirecting the action 
export const PURCHASE_INIT = 'PURCHASE_INIT'
// for fetching orders from server 
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';
// for auth 
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
// for logout 
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
// for redirect in case of redirected to auth page through burgerbuilder page
export const SET_AUTH_REDIRECT_PATH= 'SET_AUTH_REDIRECT_PATH';